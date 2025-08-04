/* Libraries */
const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function validateInput(method, path, level, data) {
    let errors = {};
    const safeString = (value) => (value !== undefined && value !== null ? value : '');

    // Helper: Validate if field is numeric
    const validateNumeric = (field, fieldName) => {
        if (!Validator.isNumeric(field)) {
            errors[fieldName] = `${fieldName.replace(/_/g, ' ')} harus berupa angka`;
        }
    };

    // Helper: Validate "SUDAH" or "BELUM"
    const validateStatus = (field, fieldName) => {
        if (field !== 'SUDAH' && field !== 'BELUM') {
            errors[fieldName] = `invalid ${fieldName.replace(/_/g, ' ')}`;
        }
    };

    // Helper: Validate ISO date
    const validateDate = (field, fieldName) => {
        if (!Validator.isISO8601(field)) {
            errors[fieldName] = `invalid tanggal ${fieldName.replace(/_/g, ' ')}`;
        }
    };

    // Ensure all fields are strings
    Object.keys(data).forEach((key) => {
        data[key] = data[key] !== undefined && data[key] !== null ? data[key] : '';
    });

    if (method === 'POST') {
        if (path === '/check') {
            ['nomor_peserta', 'nama', 'ids_jalur_masuk', 'kode_jurusan'].forEach((field) => {
                if (Validator.isEmpty(data[field])) {
                    errors[field] = `${field.replace(/_/g, ' ')} tidak boleh kosong`;
                }
            });
            if (data.ids_jalur_masuk) validateNumeric(data.ids_jalur_masuk, 'ids_jalur_masuk');
            if (data.kode_jurusan) validateNumeric(data.kode_jurusan, 'kode_jurusan');
        } else if (path === '/') {
            ['id_user', 'nomor_peserta', 'nama', 'kode_jurusan', 'ids_jalur_masuk', 'tahun', 'daftar', 'submit', 'pembayaran', 'pemberkasan'].forEach((field) => {
                if (Validator.isEmpty(data[field])) {
                    errors[field] = `${field.replace(/_/g, ' ')} tidak boleh kosong`;
                }
            });
            if (data.ids_jalur_masuk) validateNumeric(data.ids_jalur_masuk, 'ids_jalur_masuk');
            if (data.kode_jurusan) validateNumeric(data.kode_jurusan, 'kode_jurusan');
            if (data.daftar) validateStatus(data.daftar, 'daftar');
            if (data.submit) validateStatus(data.submit, 'submit');
            if (data.pembayaran) validateStatus(data.pembayaran, 'pembayaran');
            if (data.pemberkasan) validateStatus(data.pemberkasan, 'pemberkasan');
        }
    } else if (method === 'PUT') {
        if (level === 'USER') {
            [
                'id_user',
                'nomor_peserta',
                'nim',
                'nama',
                'kode_jurusan',
                'ids_jalur_masuk',
                'tahun',
                'pembayaran',
                'tgl_pembayaran',
            ].forEach((field) => {
                if (!Validator.isEmpty(safeString(data[field]))) {
                    errors[field] = `Level User tidak memiliki akses edit pada ${field.replace(/_/g, ' ')}`;
                }
            });
        }

        ['daftar', 'submit', 'pembayaran', 'pemberkasan'].forEach((field) => {
            if (data[field]) validateStatus(data[field], field);
        });

        ['tgl_daftar', 'tgl_submit', 'tgl_pembayaran', 'tgl_pemberkasan'].forEach((field) => {
            if (data[field]) validateDate(data[field], field);
        });
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};