/* Libraries */
const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function validateInput(method, path, data) {
    let errors = {};

    data.idd_kelulusan = !isEmpty(data.idd_kelulusan) ? data.idd_kelulusan : '';
    data.ids_bank = !isEmpty(data.ids_bank) ? data.ids_bank : '';
    data.va = !isEmpty(data.va) ? data.va : '';
    data.id_billing = !isEmpty(data.id_billing) ? data.id_billing : '';
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
        } else {
            if (!Validator.isLength(data.va, {
                    min: 10,
                    max: 20
                })) {
                errors.va = 'invalid virtual account';
            }
        }

        if (!Validator.isEmpty(data.id_billing)) {
            if (!Validator.isLength(data.id_billing, {
                    min: 0,
                    max: 20
                })) {
                errors.id_billing = 'invalid id billing';
            }
        }

        if (Validator.isEmpty(data.expire_at)) {
            errors.expire_at = 'tanggal pembayaran field is required';
        } else {
            // Additional regex for format YYYY-MM-DD HH:mm:ss
            const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;
            if (!regex.test(data.expire_at)) {
                errors.expire_at = 'invalid expire_at.';
            }
        }

        if (Validator.isEmpty(data.pembayaran)) {
            errors.pembayaran = 'pembayaran field is required';
        } else {
            if (!Validator.isIn(data.pembayaran, ['BELUM', 'SUDAH', 'EXPIRED'])) {
                errors.pembayaran = 'invalid pembayaran';
            }
        }
    } else if (method === 'PUT') {
        if (!Validator.isEmpty(data.idd_kelulusan)) {
            if (!Validator.isInt(data.idd_kelulusan)) {
                errors.idd_kelulusan = 'idd kelulusan field is number';
            }
        }

        if (!Validator.isEmpty(data.ids_bank)) {
            if (!Validator.isInt(data.ids_bank)) {
                errors.ids_bank = 'idd bank field is number';
            }
        }

        if (!Validator.isEmpty(data.va)) {
            if (!Validator.isLength(data.va, {
                    min: 10,
                    max: 20
                })) {
                errors.va = 'invalid virtual account';
            }
        }

        if (!Validator.isEmpty(data.id_billing)) {
            if (!Validator.isLength(data.id_billing, {
                    min: 0,
                    max: 20
                })) {
                errors.id_billing = 'invalid id billing';
            }
        }

        if (!Validator.isEmpty(data.expire_at)) {
            // Additional regex for format YYYY-MM-DD HH:mm:ss
            const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;
            if (!regex.test(data.expire_at)) {
                errors.expire_at = 'invalid expire_at.';
            }
        }

        if (!Validator.isEmpty(data.pembayaran)) {
            if (!Validator.isIn(data.pembayaran, ['BELUM', 'SUDAH', 'EXPIRED'])) {
                errors.pembayaran = 'invalid pembayaran';
            }
        }
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};