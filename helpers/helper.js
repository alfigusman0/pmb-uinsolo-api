/* Config */
const database = require('../config/database');
const redis = require('../config/redis');
/* Libraries */
const fs = require('fs');
const chmodr = require('chmodr');
const mv = require('mv');
const excel = require("exceljs");
const moment = require('moment-timezone');
const multer = require("multer");
const multerS3 = require("multer-s3");
const s3Client = require("../config/aws");
const path = require("path");
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const {
  PutObjectCommand,
  DeleteObjectCommand
} = require("@aws-sdk/client-s3");

/* Logger */
const logger = winston.createLogger({
  level: "info",
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

const helper = {};

helper.runSQL = async function (value) {
  return new Promise(function (resolve, reject) {
    try {
      database.query(value.sql, value.param, function (error, rows, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(rows);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Helper function to build SQL query with filters (supports IN, LIKE, and BETWEEN)
**/
helper.buildSQL = (baseQuery, filters) => {
  let sql = baseQuery;
  const params = [];
  const conditions = filters.map(filter => {
    if (filter.between && filter.value?.start && filter.value?.end) {
      params.push(filter.value.start, filter.value.end);
      return `${filter.key} BETWEEN ? AND ?`;
    } else if (filter.between) {
      // Tangani jika salah satu nilai `start` atau `end` tidak valid
      if (filter.value?.start) {
        params.push(filter.value.start);
        return `${filter.key} >= ?`;
      }
      if (filter.value?.end) {
        params.push(filter.value.end);
        return `${filter.key} <= ?`;
      }
    } else if (filter.in && Array.isArray(filter.value) && filter.value.length > 0) {
      params.push(...filter.value);
      return `${filter.key} IN (${filter.value.map(() => '?').join(', ')})`;
    } else if (filter.like && filter.value) {
      params.push(`%${filter.value.replace(/\s+/g, '%')}%`);
      return `${filter.key} LIKE ?`;
    } else if (filter.value !== undefined && filter.value !== null) {
      params.push(filter.value);
      return `${filter.key} = ?`;
    } else if (filter.value === null) {
      return `${filter.key} IS NULL`;
    }
    return null; // Abaikan kondisi yang tidak valid
  }).filter(condition => condition !== null); // Hapus kondisi yang tidak valid

  if (conditions.length) {
    sql += ` WHERE ${conditions.join(' AND ')}`;
  }

  return {
    sql,
    params
  };
};

helper.getPagination = (value, limit, currentpage) => {
  let limitdata = limit || process.env.LIMIT_DATA;
  let totalpage = Math.ceil(value[0].total / limitdata);
  let pagination = [];
  if (value[0].total > limitdata) {
    for (let i = 1; i <= totalpage; i++) {
      pagination.push(i);
    }
  }
  return {
    totaldata: value[0].total,
    totalpagination: totalpage,
    currentpage: parseInt(currentpage) || 0,
  };
};

helper.exportExcel = (columns, rows, filename, res) => {
  let workbook = new excel.Workbook()
  let worksheet = workbook.addWorksheet(filename)
  worksheet.columns = columns
  worksheet.addRows(rows)
  res.setHeader(
    "Content-type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  )
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=" + filename + ".xlsx"
  );
  return workbook.xlsx.write(res)
};

helper.checkFolder = async (path) => {
  try {
    /* create a folder recursively, if the folder is not already available */
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, {
        recursive: true
      });
      chmodr(path, 0o777, (err) => {
        if (err) throw new Error(err);
        console.log('Success change permission.');
      });
    } else {
      console.log("folder is already available");
    }
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

helper.uploadFile = async (oldpath, newpath) => {
  try {
    mv(oldpath, newpath, (err) => {
      if (err) throw new Error(err);
      console.log("file transfer successful.");
    });
    return true
  } catch (e) {
    console.error(e);
    return false;
  }
}

helper.deleteFile = async (path) => {
  try {
    if (fs.existsSync(path)) {
      fs.unlink(path, (err) => {
        if (err) throw err;
        console.log("successfully deleted file");
      });
    } else {
      console.log("file not found");
    }
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

helper.id = async () => {
  let response = Date.now() + 1;
  return response
};

helper.uuid = () => {
  let sqlQueryUUID = {
    sql: "SELECT UUID() as uuidLong"
  }
  let response = helper.runSQL(sqlQueryUUID)
  return response
};

helper.gmailconfig = (method, url, token) => {
  return {
    method: method,
    url: url,
    headers: {
      Authorization: `Bearer ${token} `,
      "Content-type": "application/json"
    },
  };
}

/* Upload file to S3 */
const upload = (folder = "", allowedFileTypes = null) => {
  return multer({
    storage: multerS3({
      s3: s3Client,
      bucket: process.env.AWS_BUCKET_NAME,
      acl: "public-read", // Atur akses file agar bisa diakses publik
      key: (req, file, cb) => {
        const folderPath = folder ? `${folder}/` : ""; // Jika folder ada, tambahkan prefix
        const ext = path.extname(file.originalname); // Ambil ekstensi file
        console.log(`File extension: ${ext}`); // Debugging
        const fileName = `${folderPath}${Date.now()+1}${ext}`;
        cb(null, fileName);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (allowedFileTypes && allowedFileTypes.length > 0) {
        const ext = path.extname(file.originalname).toLowerCase();
        if (!allowedFileTypes.includes(ext)) {
          return cb(new Error(`File type not allowed: ${ext}`), false);
        }
      }
      cb(null, true);
    },
  });
};
helper.upload = upload;

// Fungsi hapus file dari S3
helper.deleteFile = async (fileUrl) => {
  try {
    // Ambil nama bucket dari ENV
    const bucketName = process.env.AWS_BUCKET_NAME;

    // Ekstrak path file dari URL
    const filePath = fileUrl.split(`/${bucketName}/`)[1];

    if (!filePath) {
      throw new Error("Invalid file URL");
    }

    // Perintah hapus file
    const deleteParams = {
      Bucket: bucketName,
      Key: filePath,
    };

    await s3Client.send(new DeleteObjectCommand(deleteParams));

    return {
      success: true,
      message: "File deleted successfully"
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to delete file",
      error: error.message
    };
  }
};

helper.deleteKeysByPattern = async (patterns) => {
  if (process.env.REDIS_ACTIVE !== 'ON') {
    console.log('Redis is not active, skipping cache deletion.');
    return 0;
  }

  try {
    let deletedCount = 0;

    if (process.env.REDIS_CLUSTER === 'true') {
      // Mode Cluster: Memindai semua node master
      const nodes = redis.nodes('master');
      for (const node of nodes) {
        const stream = node.scanStream({
          match: patterns,
          count: 100000
        });

        console.log(`Scanning keys in node ${node.options.host}:${node.options.port} with pattern: ${patterns}`);

        stream.on('data', async (keys) => {
          if (keys.length > 0) {
            const pipeline = node.pipeline();
            keys.forEach(key => pipeline.del(key));
            const result = await pipeline.exec();
            deletedCount += keys.length;
            console.log(`Deleted ${keys.length} keys from node ${node.options.host}:${node.options.port}`);
          }
        });

        stream.on('error', (err) => {
          console.error(`Error scanning keys on node ${node.options.host}:${node.options.port}:`, err);
        });

        await new Promise(resolve => stream.on('end', resolve));
      }
    } else {
      // Mode Standalone: Memindai instance tunggal
      const stream = redis.scanStream({
        match: patterns,
        count: 100000
      });

      stream.on('data', async (keys) => {
        if (keys.length > 0) {
          const pipeline = redis.pipeline();
          keys.forEach(key => pipeline.del(key));
          const result = await pipeline.exec();
          deletedCount += keys.length;
          console.log(`Deleted ${keys.length} keys from standalone Redis`);
        }
      });

      stream.on('error', (err) => {
        console.error('Error scanning keys in standalone Redis:', err);
      });

      await new Promise(resolve => stream.on('end', resolve));
    }

    console.log(`Total deleted keys: ${deletedCount}`);
    return deletedCount;
  } catch (error) {
    logger.error('Redis error during cache deletion:', error);
    throw error;
  }
};

// convert date to string format YYYY-MM-DD
helper.convertoDate = (date) => {
  if (date) {
    let dateFormat = moment(date).tz('Asia/Jakarta').format("YYYY-MM-DD");
    return dateFormat;
  } else {
    return null;
  }
};

// convert date to string format YYYY-MM-DD hh:mm:ss
helper.convertoDateTime = (date) => {
  if (date) {
    let dateFormat = moment(date).tz('Asia/Jakarta').format("YYYY-MM-DD HH:mm:ss");
    return dateFormat;
  } else {
    return null;
  }
};

module.exports = helper;