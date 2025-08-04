/* Libraries */
const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function validateInput(method, data) {
    let errors = {};

    data.idd_kelulusan = !isEmpty(data.idd_kelulusan) ? data.idd_kelulusan : '';
    data.orangtua = !isEmpty(data.orangtua) ? data.orangtua : '';
    data.nik_orangtua = !isEmpty(data.nik_orangtua) ? data.nik_orangtua : '';
    data.nama_orangtua = !isEmpty(data.nama_orangtua) ? data.nama_orangtua : '';
    data.tgl_lahir_orangtua = !isEmpty(data.tgl_lahir_orangtua) ? data.tgl_lahir_orangtua : '';
    data.ids_pendidikan = !isEmpty(data.ids_pendidikan) ? data.ids_pendidikan : '';
    data.ids_pekerjaan = !isEmpty(data.ids_pekerjaan) ? data.ids_pekerjaan : '';
    data.ids_penghasilan = !isEmpty(data.ids_penghasilan) ? data.ids_penghasilan : '';
    data.nominal_penghasilan = !isEmpty(data.nominal_penghasilan) ? data.nominal_penghasilan : '';
    data.terbilang_penghasilan = !isEmpty(data.terbilang_penghasilan) ? data.terbilang_penghasilan : '';

    if (method === 'POST') {
        if (Validator.isEmpty(data.idd_kelulusan)) {
            errors.idd_kelulusan = 'idd kelulusan field is required';
        } else {
            if (!Validator.isInt(data.idd_kelulusan)) {
                errors.idd_kelulusan = 'idd kelulusan field is number';
            }
        }

        if (Validator.isEmpty(data.orangtua)) {
            errors.orangtua = 'orangtua field is required';
        } else {
            if (!(data.orangtua == 'Ayah' || data.orangtua == 'Ibu' || data.orangtua == 'Wali')) {
                errors.orangtua = 'invalid orangtua';
            }
        }

        if (Validator.isEmpty(data.nik_orangtua)) {
            errors.nik_orangtua = 'nik orangtua field is required';
        }

        if (Validator.isEmpty(data.nama_orangtua)) {
            errors.nama_orangtua = 'nama orangtua field is required';
        } else {
            if (!Validator.isLength(data.nama_orangtua, {
                    min: 2,
                    max: 100
                })) {
                errors.nama_orangtua = 'nama orangtua field is between 2 and 100 character';
            }
        }

        if (Validator.isEmpty(data.tgl_lahir_orangtua)) {
            errors.tgl_lahir_orangtua = 'tanggal lahir orangtua field is required';
        } else {
            if (!Validator.isDate(data.tgl_lahir_orangtua)) {
                errors.tgl_lahir_orangtua = 'invalid tanggal lahir orangtua';
            }
        }

        if (Validator.isEmpty(data.ids_pendidikan)) {
            errors.ids_pendidikan = 'pendidikan field is required';
        } else {
            if (!Validator.isInt(data.ids_pendidikan)) {
                errors.ids_pendidikan = 'pendidikan field is number';
            }
        }

        if (Validator.isEmpty(data.ids_pekerjaan)) {
            errors.ids_pekerjaan = 'pekerjaan field is required';
        } else {
            if (!Validator.isInt(data.ids_pekerjaan)) {
                errors.ids_pekerjaan = 'pekerjaan field is number';
            }
        }

        if (Validator.isEmpty(data.ids_penghasilan)) {
            errors.ids_penghasilan = 'penghasilan field is required';
        } else {
            if (!Validator.isInt(data.ids_penghasilan)) {
                errors.ids_penghasilan = 'penghasilan field is number';
            }
        }

        if (Validator.isEmpty(data.nominal_penghasilan)) {
            errors.nominal_penghasilan = 'nominal penghasilan field is required';
        } else {
            if (!Validator.isInt(data.nominal_penghasilan)) {
                errors.nominal_penghasilan = 'nominal penghasilan field is number';
            }

            if (data.nominal_penghasilan < 0) {
                errors.nominal_penghasilan = 'nominal penghasilan field is greater than 0';
            }
        }

        if (Validator.isEmpty(data.terbilang_penghasilan)) {
            errors.terbilang_penghasilan = 'terbilang penghasilan field is required';
        }
    } else if (method === 'PUT') {
        if (data.orangtua !== '') {
            if (!Validator.isEmpty(data.orangtua)) {
                if (!(data.orangtua == 'Ayah' || data.orangtua == 'Ibu' || data.orangtua == 'Wali')) {
                    errors.orangtua = 'invalid orangtua';
                }
            }
        }

        if (data.nama_orangtua !== '') {
            if (!Validator.isEmpty(data.nama_orangtua)) {
                if (!Validator.isLength(data.nama_orangtua, {
                        min: 2,
                        max: 100
                    })) {
                    errors.nama_orangtua = 'nama orangtua field is between 2 and 100 character';
                }
            }
        }

        if (data.tgl_lahir_orangtua !== '') {
            if (!Validator.isEmpty(data.tgl_lahir_orangtua)) {
                if (!Validator.isDate(data.tgl_lahir_orangtua)) {
                    errors.tgl_lahir_orangtua = 'invalid tanggal lahir';
                }
            }
        }

        if (data.ids_pendidikan !== '') {
            if (!Validator.isEmpty(data.ids_pendidikan)) {
                if (!Validator.isInt(data.ids_pendidikan)) {
                    errors.ids_pendidikan = 'pendidikan field is number';
                }
            }
        }

        if (data.ids_pekerjaan !== '') {
            if (!Validator.isEmpty(data.ids_pekerjaan)) {
                if (!Validator.isInt(data.ids_pekerjaan)) {
                    errors.ids_pekerjaan = 'pekerjaan field is number';
                }
            }
        }

        if (data.ids_penghasilan !== '') {
            if (!Validator.isEmpty(data.ids_penghasilan)) {
                if (!Validator.isInt(data.ids_penghasilan)) {
                    errors.ids_penghasilan = 'penghasilan field is number';
                }
            }
        }

        if (data.nominal_penghasilan !== '') {
            if (!Validator.isEmpty(data.nominal_penghasilan)) {
                if (!Validator.isInt(data.nominal_penghasilan)) {
                    errors.nominal_penghasilan = 'nominal penghasilan field is number';
                }

                if (data.nominal_penghasilan < 0) {
                    errors.nominal_penghasilan = 'nominal penghasilan field is greater than 0';
                }
            }
        }
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};