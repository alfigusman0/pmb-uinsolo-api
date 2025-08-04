/* Libraries */
const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function validateInput(method, path, data) {
    let errors = {};

    data.idd_kelulusan = !isEmpty(data.idd_kelulusan) ? data.idd_kelulusan : '';
    data.score = !isEmpty(data.score) ? data.score : '';
    data.kategori = !isEmpty(data.kategori) ? data.kategori : '';
    data.jumlah = !isEmpty(data.jumlah) ? data.jumlah : '';
    data.potongan = !isEmpty(data.potongan) ? data.potongan : '';

    if (method === 'POST') {
        if (Validator.isEmpty(data.idd_kelulusan)) {
            errors.idd_kelulusan = 'idd kelulusan field is required';
        } else {
            if (!Validator.isInt(data.idd_kelulusan)) {
                errors.idd_kelulusan = 'idd kelulusan field is number';
            }
        }

        if (Validator.isEmpty(data.score)) {
            errors.score = 'score field is required';
        } else {
            if (!Validator.isFloat(data.score)) {
                errors.score = 'score field is number';
            }
        }

        if (Validator.isEmpty(data.kategori)) {
            errors.kategori = 'kategori field is required';
        } else {
            if (!Validator.isIn(data.kategori, ['K1', 'K2', 'K3', 'K4', 'K5', 'K6', 'K7', 'K8', 'K9'])) {
                errors.kategori = 'invalid kategori.';
            }
        }

        if (Validator.isEmpty(data.jumlah)) {
            errors.jumlah = 'jumlah field is required';
        } else {
            if (!Validator.isInt(data.jumlah)) {
                errors.jumlah = 'jumlah field is number';
            }
        }

        if (Validator.isEmpty(data.potongan)) {
            errors.potongan = 'potongan field is required';
        } else {
            if (!Validator.isInt(data.potongan)) {
                errors.potongan = 'potongan field is number';
            }
        }
    } else if (method === 'PUT') {
        if (!Validator.isEmpty(data.idd_kelulusan)) {
            if (!Validator.isInt(data.idd_kelulusan)) {
                errors.idd_kelulusan = 'idd kelulusan field is number';
            }
        }

        if (!Validator.isEmpty(data.score)) {
            if (!Validator.isFloat(data.score)) {
                errors.score = 'score field is number';
            }
        }

        if (!Validator.isEmpty(data.kategori)) {
            if (!Validator.isIn(data.kategori, ['K1', 'K2', 'K3', 'K4', 'K5', 'K6', 'K7', 'K8', 'K9'])) {
                errors.kategori = 'invalid kategori.';
            }
        }

        if (!Validator.isEmpty(data.jumlah)) {
            if (!Validator.isInt(data.jumlah)) {
                errors.jumlah = 'jumlah field is number';
            }
        }

        if (!Validator.isEmpty(data.potongan)) {
            if (!Validator.isInt(data.potongan)) {
                errors.potongan = 'potongan field is number';
            }
        }
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};