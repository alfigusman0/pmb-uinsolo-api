/* Libraries */
const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function validateInput(method, data) {
    let errors = {};

    data.idd_kelulusan = !isEmpty(data.idd_kelulusan) ? data.idd_kelulusan : '';
    data.ids_bank = !isEmpty(data.ids_bank) ? data.ids_bank : '';
    data.va = !isEmpty(data.va) ? data.va : '';
    data.expire_at = !isEmpty(data.expire_at) ? data.expire_at : '';
    data.pembayaran = !isEmpty(data.pembayaran) ? data.pembayaran : '';

    if (method === 'POST') {
        if (Validator.isEmpty(data.idd_kelulusan)) {
            errors.idd_kelulusan = 'idd kelulusan field is required';
        } else {
            if (!Validator.isInt(data.idd_kelulusan)) {
                errors.idd_kelulusan = 'idd kelulusan field is number';
            }
        }

        if (Validator.isEmpty(data.ids_bank)) {
            errors.ids_bank = 'idd bank field is required';
        } else {
            if (!Validator.isInt(data.ids_bank)) {
                errors.ids_bank = 'idd bank field is number';
            }
        }

        if (Validator.isEmpty(data.va)) {
            errors.va = 'virtual account field is required';
        }

        if (Validator.isEmpty(data.id_billing)) {
            errors.id_billing = 'id biling field is required';
        } else {
            if (!Validator.isInt(data.id_billing)) {
                errors.id_billing = 'id biling field is number';
            }
        }

        if (Validator.isEmpty(data.expire_at)) {
            errors.expire_at = 'tanggal pembayaran field is required';
        } else {
            if (!Validator.isDate(data.expire_at)) {
                errors.expire_at = 'invalid tanggal pembayaran';
            }
        }

        if (Validator.isEmpty(data.pembayaran)) {
            errors.pembayaran = 'pembayaran field is required';
        } else {
            if (!(data.pembayaran == 'BELUM' || data.pembayaran == 'EXPIRED')) {
                errors.pembayaran = 'invalid pembayaran';
            }
        }
    } else if (method === 'PUT') {
        if (data.pembayaran !== '') {
            if (!Validator.isEmpty(data.pembayaran)) {
                if (!(data.pembayaran == 'BELUM' || data.pembayaran == 'EXPIRED')) {
                    errors.pembayaran = 'invalid pembayaran';
                }
            }
        }
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};