/* Config */
const redis = require('../../config/redis');
/* Libraries */
const md5 = require('md5');
const moment = require('moment');
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
/* Helpers */
const helper = require('../../helpers/helper');
const response = require('../../helpers/response');
const isEmpty = require('../../validation/is-empty');
/* Logger */
const logger = winston.createLogger({
    daya_tampung: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        winston.format.json()
    ),
    handleExceptions: true,
    handleRejections: true,
    transports: [
        new winston.transports.Console({}),
        new DailyRotateFile({
            filename: "./logs/log-%DATE%.log",
            zippedArchive: true,
            maxSize: "100m",
            maxFiles: "14d"
        }),
    ]
});

const Controller = {};

const redisPrefix = process.env.REDIS_PREFIX + "pradaftar:sekolah:";

// Helper function to check access rights
const checkAccess = async (req, action) => {
    const sql = {
        sql: "SELECT * FROM tbs_hak_akses WHERE ids_level = ? AND ids_modul = ? AND permission LIKE ?",
        param: [req.authIdsLevel, 53, `%${action}%`]
    };
    const result = await helper.runSQL(sql);
    return result.length > 0;
};

// Helper function to handle errors
const handleError = (error, res) => {
    logger.error(error);
    return response.sc500('An error occurred in the system, please try again.', {}, res);
};

Controller.create = async (req, res) => {
    try {
        const hasAccess = await checkAccess(req, 'create');
        if (!hasAccess) {
            return response.sc401("Access denied.", {}, res);
        }

        const created_by = (req.authIdsLevel === 5) ? req.authIdUser : req.body.id_user || req.authIdUser;
        const {
            idp_formulir,
            nisn,
            ids_rumpun,
            ids_jurusan_sekolah,
            nama_sekolah,
            akreditasi_sekolah,
        } = req.body;

        /* Check existing data */
        let checkData = await helper.runSQL({
            sql: 'SELECT idp_formulir FROM `tbp_sekolah` WHERE idp_formulir = ? LIMIT 1',
            param: [idp_formulir],
        });
        if (checkData.length) {
            return response.sc400('Data already exists.', {}, res);
        }

        /* SQL Insert Data */
        const result = await helper.runSQL({
            sql: 'INSERT INTO `tbp_sekolah`(`idp_formulir`, `nisn`, `ids_rumpun`, `ids_jurusan_sekolah`, `nama_sekolah`, `akreditasi_sekolah`, `created_by`) VALUES (?, ?, ?, ?, ?, ?, ?)',
            param: [idp_formulir, nisn, ids_rumpun, ids_jurusan_sekolah, nama_sekolah, akreditasi_sekolah, created_by],
        });

        const json = {
            idp_formulir: idp_formulir,
            idp_sekolah: result.insertId,
        }

        try {
            await helper.deleteKeysByPattern(redisPrefix + '*');
        } catch (redisError) {
            logger.error('Failed to delete Redis cache in create:', redisError);
        }

        return response.sc200('Data added successfully.', json, res);
    } catch (error) {
        console.log(error);
        return handleError(error, res);
    }
}

Controller.read = async (req, res) => {
    try {
        const hasAccess = await checkAccess(req, 'read');
        if (!hasAccess) {
            return response.sc401("Access denied.", {}, res);
        }

        const key = redisPrefix + "read:" + md5(req.originalUrl);
        const order_by = req.query.order_by || 'date_created DESC';
        const created_by = (req.authIdsLevel === 5) ? req.authIdUser : req.query.id_user;
        const {
            idp_sekolah,
            idp_formulir,
            nomor_peserta,
        } = req.query;

        // Check Redis cache
        let cache = null;
        if (process.env.REDIS_ACTIVE === "ON") {
            try {
                cache = await redis.get(key);
                if (cache) {
                    return response.sc200('Data from cache.', JSON.parse(cache), res);
                }
            } catch (redisError) {
                logger.error('Redis get error:', redisError);
            }
        }

        // Pagination
        const resPerPage = parseInt(req.query.limit) || parseInt(process.env.LIMIT_DATA || 10); // Default 10
        const page = (parseInt(req.query.page) || 1) - 1; // Pastikan page tidak negatif
        const currentPage = parseInt(req.query.page) || 1;

        // Build SQL query
        let sqlRead = "SELECT * FROM `viewp_sekolah`";
        let sqlReadTotalData = "SELECT COUNT(idp_sekolah) as total FROM `viewp_sekolah`";
        const params = [];
        const totalParams = [];

        const addCondition = (field, value, operator = '=') => {
            if (!isEmpty(value)) {
                const condition = `${field} ${operator} ?`;
                sqlRead += sqlRead.includes('WHERE') ? ` AND ${condition}` : ` WHERE ${condition}`;
                sqlReadTotalData += sqlReadTotalData.includes('WHERE') ? ` AND ${condition}` : ` WHERE ${condition}`;
                params.push(operator === 'LIKE' ? `%${value}%` : value);
                totalParams.push(operator === 'LIKE' ? `%${value}%` : value);
            }
        };

        addCondition('idp_sekolah', idp_sekolah);
        addCondition('idp_formulir', idp_formulir);
        addCondition('nomor_peserta', nomor_peserta);
        addCondition('created_by', created_by);

        sqlRead += ` ORDER BY ${order_by} LIMIT ?, ?`;
        params.push(page * resPerPage, resPerPage);

        // Execute queries
        const [getData, getTotalData] = await Promise.all([
            helper.runSQL({
                sql: sqlRead,
                param: params
            }),
            helper.runSQL({
                sql: sqlReadTotalData,
                param: totalParams
            })
        ]);

        if (!getData.length) {
            return response.sc404('Data not found.', {}, res);
        }

        const pagination = helper.getPagination(getTotalData, resPerPage, currentPage);
        const json = {
            data: getData,
            pagination
        };

        // Set Redis cache
        if (process.env.REDIS_ACTIVE === "ON") {
            try {
                await redis.set(key, JSON.stringify(json), 'EX', 60 * 60 * 24 * (process.env.REDIS_DAY || 1)); // Default 1 hari
            } catch (redisError) {
                logger.error('Redis error:', redisError);
            }
        }

        return response.sc200('', json, res);
    } catch (error) {
        console.log(error);
        return handleError(error, res);
    }
}

Controller.update = async (req, res) => {
    try {
        const hasAccess = await checkAccess(req, 'update');
        if (!hasAccess) {
            return response.sc401("Access denied.", {}, res);
        }

        const id = req.params.id;
        const created_by = (req.authIdsLevel === 5) ? req.authIdUser : req.body.id_user || req.authIdUser;
        const {
            idp_formulir,
            nisn,
            ids_rumpun,
            ids_jurusan_sekolah,
            nama_sekolah,
            akreditasi_sekolah,
        } = req.body;

        /* Check existing data */
        let sql = 'SELECT idp_sekolah FROM `tbp_sekolah` WHERE idp_sekolah = ?';
        const param = [id];
        if (req.authIdLevel == 5) {
            sql += ' AND created_by = ?';
            param.push(req.authIdUser);
        }
        sql += ' LIMIT 1';
        const checkData = await helper.runSQL({
            sql,
            param
        });
        if (!checkData.length) {
            return response.sc404('Data not found.', {}, res);
        }

        // Build SQL update query
        const updates = [];
        const params = [];

        const addUpdate = (field, value) => {
            if (!isEmpty(value)) {
                updates.push(`${field} = ?`);
                params.push(value);
            }
        };

        addUpdate('idp_formulir', idp_formulir);
        addUpdate('nisn', nisn);
        addUpdate('ids_rumpun', ids_rumpun);
        addUpdate('ids_jurusan_sekolah', ids_jurusan_sekolah);
        addUpdate('nama_sekolah', nama_sekolah);
        addUpdate('akreditasi_sekolah', akreditasi_sekolah);
        addUpdate('created_by', created_by);

        // Check Data Update
        if (isEmpty(params)) {
            return response.sc400("No data has been changed.", {}, res);
        }

        addUpdate('updated_by', req.authIdUser);
        await helper.runSQL({
            sql: `UPDATE tbp_sekolah SET ${updates.join(', ')} WHERE idp_sekolah = ?`,
            param: [...params, id],
        });

        // Hapus cache Redis
        try {
            await helper.deleteKeysByPattern(redisPrefix + '*');
        } catch (redisError) {
            logger.error('Failed to delete Redis cache in update:', redisError);
        }

        return response.sc200('Data changed successfully.', {}, res);
    } catch (error) {
        console.log(error);
        return handleError(error, res);
    }
}

Controller.delete = async (req, res) => {
    try {
        const hasAccess = await checkAccess(req, 'delete');
        if (!hasAccess) {
            return response.sc401("Access denied.", {}, res);
        }

        const id = req.params.id;

        /* Check existing data */
        let sql = 'SELECT idp_sekolah FROM `tbp_sekolah` WHERE idp_sekolah = ?';
        const param = [id];
        if (req.authIdLevel == 5) {
            sql += ' AND created_by = ?';
            param.push(req.authIdUser);
        }
        sql += ' LIMIT 1';
        const checkData = await helper.runSQL({
            sql,
            param
        });
        if (!checkData.length) {
            return response.sc404('Data not found.', {}, res);
        }

        // SQL Delete Data
        await helper.runSQL({
            sql: 'DELETE FROM `tbp_sekolah` WHERE idp_sekolah = ?',
            param: [id],
        });

        // Hapus cache Redis
        try {
            await helper.deleteKeysByPattern(redisPrefix + '*');
        } catch (redisError) {
            logger.error('Failed to delete Redis cache in delete:', redisError);
        }
        return response.sc200('Data deleted successfully.', {}, res);
    } catch (error) {
        console.log(error);
        return handleError(error, res);
    }
}

Controller.single = async (req, res) => {
    try {
        const hasAccess = await checkAccess(req, 'single');
        if (!hasAccess) {
            return response.sc401("Access denied.", {}, res);
        }

        const key = redisPrefix + "single:" + md5(req.originalUrl);
        const created_by = (req.authIdsLevel === 5) ? req.authIdUser : req.query.id_user;
        const {
            idp_sekolah,
            idp_formulir,
            nomor_peserta,
        } = req.query;

        // Check Redis cache
        let cache = null;
        if (process.env.REDIS_ACTIVE === "ON") {
            try {
                cache = await redis.get(key);
                if (cache) {
                    return response.sc200('Data from cache.', JSON.parse(cache), res);
                }
            } catch (redisError) {
                logger.error('Redis get error:', redisError);
            }
        }

        // Build SQL query
        let sqlSingle = "SELECT * FROM `viewp_sekolah`";
        const params = [];

        const addCondition = (field, value, operator = '=') => {
            if (!isEmpty(value)) {
                const condition = `${field} ${operator} ?`;
                sqlSingle += sqlSingle.includes('WHERE') ? ` AND ${condition}` : ` WHERE ${condition}`;
                params.push(operator === 'LIKE' ? `%${value}%` : value);
            }
        };

        addCondition('idp_sekolah', idp_sekolah);
        addCondition('idp_formulir', idp_formulir);
        addCondition('nomor_peserta', nomor_peserta);
        addCondition('created_by', created_by);

        // Limit to 1 row
        sqlSingle += ' LIMIT 1';

        // Execute query
        const getData = await helper.runSQL({
            sql: sqlSingle,
            param: params
        });

        if (!getData.length) {
            return response.sc404('Data not found.', {}, res);
        }

        const json = getData[0];

        // Set Redis cache
        if (process.env.REDIS_ACTIVE === "ON") {
            try {
                await redis.set(key, JSON.stringify(json), 'EX', 60 * 60 * 24 * (process.env.REDIS_DAY || 1)); // Default 1 hari
            } catch (redisError) {
                logger.error('Redis error:', redisError);
            }
        }

        return response.sc200('', json, res);
    } catch (error) {
        console.log(error);
        return handleError(error, res);
    }
}

module.exports = Controller;