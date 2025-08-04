/* Libraries */
const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function validateInput(method, path, data) {
    let errors = {};

    data.idd_kelulusan = !isEmpty(data.idd_kelulusan) ? data.idd_kelulusan : '';
    data.nisn = !isEmpty(data.nisn) ? data.nisn : '';
    data.ids_jurusan_sekolah = !isEmpty(data.ids_jurusan_sekolah) ? data.ids_jurusan_sekolah : '';
    data.nama_sekolah = !isEmpty(data.nama_sekolah) ? data.nama_sekolah : '';
    data.akreditasi_sekolah = !isEmpty(data.akreditasi_sekolah) ? data.akreditasi_sekolah : '';
    data.ids_rumpun = !isEmpty(data.ids_rumpun) ? data.ids_rumpun : '';

    if (method === 'POST') {
        if (Validator.isEmpty(data.idd_kelulusan)) {
            errors.idd_kelulusan = 'idd kelulusan field is required';
        } else {
            if (!Validator.isInt(data.idd_kelulusan)) {
                errors.idd_kelulusan = 'idd kelulusan field is number';
            }
        }

        if (Validator.isEmpty(data.nisn)) {
            errors.nisn = 'nisn field is required';
        } else {
            // min 10 max 10
            if (!Validator.isLength(data.nisn, {
                    min: 10,
                    max: 10
                })) {
                errors.nisn = 'nisn field is number';
            }

            if (!Validator.isInt(data.nisn)) {
                errors.nisn = 'nisn field is number';
            }
        }

        if (Validator.isEmpty(data.ids_jurusan_sekolah)) {
            errors.ids_jurusan_sekolah = 'jurusan sekolah field is required';
        } else {
            if (!Validator.isInt(data.ids_jurusan_sekolah)) {
                errors.ids_jurusan_sekolah = 'jurusan sekolah field is number';
            }
        }

        if (Validator.isEmpty(data.nama_sekolah)) {
            errors.nama_sekolah = 'nama sekolah field is required';
        } else {
            // min 3, max 25
            if (!Validator.isLength(data.nama_sekolah, {
                    min: 3,
                    max: 255
                })) {
                errors.nama_sekolah = 'nama sekolah field is number';
            }
        }

        if (Validator.isEmpty(data.akreditasi_sekolah)) {
            errors.akreditasi_sekolah = 'akreditasi sekolah field is required';
        } else {
            // A, B, C, Belum Akreditasi, Belum Terakreditasi
            if (!Validator.isIn(data.akreditasi_sekolah, ['A', 'B', 'C', 'Belum Akreditasi', 'Belum Terakreditasi'])) {
                errors.akreditasi_sekolah = 'akreditasi sekolah field is number';
            }
        }

        if (Validator.isEmpty(data.ids_rumpun)) {
            errors.ids_rumpun = 'rumpun field is required';
        } else {
            if (!Validator.isInt(data.ids_rumpun)) {
                errors.ids_rumpun = 'rumpun field is number';
            }
        }
    } else if (method === 'PUT') {
        if (!Validator.isEmpty(data.idd_kelulusan)) {
            if (!Validator.isInt(data.idd_kelulusan)) {
                errors.idd_kelulusan = 'idd kelulusan field is number';
            }
        }

        if (!Validator.isEmpty(data.nisn)) {
            // min 10 max 10
            if (!Validator.isLength(data.nisn, {
                    min: 10,
                    max: 10
                })) {
                errors.nisn = 'nisn field is number';
            }

            if (!Validator.isInt(data.nisn)) {
                errors.nisn = 'nisn field is number';
            }
        }

        if (!Validator.isEmpty(data.ids_jurusan_sekolah)) {
            if (!Validator.isInt(data.ids_jurusan_sekolah)) {
                errors.ids_jurusan_sekolah = 'jurusan sekolah field is number';
            }
        }

        if (!Validator.isEmpty(data.nama_sekolah)) {
            // min 3, max 25
            if (!Validator.isLength(data.nama_sekolah, {
                    min: 3,
                    max: 255
                })) {
                errors.nama_sekolah = 'nama sekolah field is number';
            }
        }

        if (!Validator.isEmpty(data.akreditasi_sekolah)) {
            // A, B, C, Belum Akreditasi, Belum Terakreditasi
            if (!Validator.isIn(data.akreditasi_sekolah, ['A', 'B', 'C', 'Belum Akreditasi', 'Belum Terakreditasi'])) {
                errors.akreditasi_sekolah = 'akreditasi sekolah field is number';
            }
        }

        if (!Validator.isEmpty(data.ids_rumpun)) {
            if (!Validator.isInt(data.ids_rumpun)) {
                errors.ids_rumpun = 'rumpun field is number';
            }
        }
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};