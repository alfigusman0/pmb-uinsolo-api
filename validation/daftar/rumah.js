/* Libraries */
const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function validateInput(method, data) {
    let errors = {};

    data.idd_kelulusan = !isEmpty(data.idd_kelulusan) ? data.idd_kelulusan : '';
    data.ids_tanggungan = !isEmpty(data.ids_tanggungan) ? data.ids_tanggungan : '';
    data.ids_rekening_listrik = !isEmpty(data.ids_rekening_listrik) ? data.ids_rekening_listrik : '';
    data.ids_daya_listrik = !isEmpty(data.ids_daya_listrik) ? data.ids_daya_listrik : '';
    data.ids_rekening_pbb = !isEmpty(data.ids_rekening_pbb) ? data.ids_rekening_pbb : '';
    data.ids_pembayaran_pbb = !isEmpty(data.ids_pembayaran_pbb) ? data.ids_pembayaran_pbb : '';
    data.ids_kelurahan = !isEmpty(data.ids_kelurahan) ? data.ids_kelurahan : '';
    data.dusun = !isEmpty(data.dusun) ? data.dusun : '';
    data.rw = !isEmpty(data.rw) ? data.rw : '';
    data.rt = !isEmpty(data.rt) ? data.rt : '';
    data.jalan = !isEmpty(data.jalan) ? data.jalan : '';
    data.kode_pos = !isEmpty(data.kode_pos) ? data.kode_pos : '';

    if (method === 'POST') {
        if (Validator.isEmpty(data.idd_kelulusan)) {
            errors.idd_kelulusan = 'idd kelulusan field is required';
        } else {
            if (!Validator.isInt(data.idd_kelulusan)) {
                errors.idd_kelulusan = 'idd kelulusan field is number';
            }
        }

        if (Validator.isEmpty(data.ids_tanggungan)) {
            errors.ids_tanggungan = 'ids tanggungan field is required';
        } else {
            if (!Validator.isInt(data.ids_tanggungan)) {
                errors.ids_tanggungan = 'ids tanggungan field is number';
            }
        }

        if (Validator.isEmpty(data.ids_rekening_listrik)) {
            errors.ids_rekening_listrik = 'ids rekening listrik field is required';
        } else {
            if (!Validator.isInt(data.ids_rekening_listrik)) {
                errors.ids_rekening_listrik = 'ids rekening listrik field is number';
            }
        }

        if (Validator.isEmpty(data.ids_daya_listrik)) {
            errors.ids_daya_listrik = 'ids daya listrik field is required';
        } else {
            if (!Validator.isInt(data.ids_daya_listrik)) {
                errors.ids_daya_listrik = 'ids daya listrik field is number';
            }
        }

        if (Validator.isEmpty(data.ids_rekening_pbb)) {
            errors.ids_rekening_pbb = 'ids rekening pbb field is required';
        } else {
            if (!Validator.isInt(data.ids_rekening_pbb)) {
                errors.ids_rekening_pbb = 'ids rekening pbb field is number';
            }
        }

        if (Validator.isEmpty(data.ids_pembayaran_pbb)) {
            errors.ids_pembayaran_pbb = 'ids pembayaran pbb field is required';
        } else {
            if (!Validator.isInt(data.ids_pembayaran_pbb)) {
                errors.ids_pembayaran_pbb = 'ids pembayaran pbb field is number';
            }
        }

        if (Validator.isEmpty(data.ids_kelurahan)) {
            errors.ids_kelurahan = 'ids kelurahan field is required';
        } else {
            if (!Validator.isInt(data.ids_kelurahan)) {
                errors.ids_kelurahan = 'ids kelurahan field is number';
            }
        }
    } else if (method === 'PUT') {
        if (data.ids_tanggungan !== '') {
            if (!Validator.isEmpty(data.ids_tanggungan)) {
                if (!Validator.isInt(data.ids_tanggungan)) {
                    errors.ids_tanggungan = 'ids tanggungan field is number';
                }
            }
        }

        if (data.ids_rekening_listrik !== '') {
            if (!Validator.isEmpty(data.ids_rekening_listrik)) {
                if (!Validator.isInt(data.ids_rekening_listrik)) {
                    errors.ids_rekening_listrik = 'ids rekening listrik field is number';
                }
            }
        }

        if (data.ids_daya_listrik !== '') {
            if (!Validator.isEmpty(data.ids_daya_listrik)) {
                if (!Validator.isInt(data.ids_daya_listrik)) {
                    errors.ids_daya_listrik = 'ids daya listrik field is number';
                }
            }
        }

        if (data.ids_rekening_pbb !== '') {
            if (!Validator.isEmpty(data.ids_rekening_pbb)) {
                if (!Validator.isInt(data.ids_rekening_pbb)) {
                    errors.ids_rekening_pbb = 'ids rekening pbb field is number';
                }
            }
        }

        if (data.ids_pembayaran_pbb !== '') {
            if (!Validator.isEmpty(data.ids_pembayaran_pbb)) {
                if (!Validator.isInt(data.ids_pembayaran_pbb)) {
                    errors.ids_pembayaran_pbb = 'ids pembayaran pbb field is number';
                }
            }
        }

        if (data.ids_kelurahan !== '') {
            if (!Validator.isEmpty(data.ids_kelurahan)) {
                if (!Validator.isInt(data.ids_kelurahan)) {
                    errors.ids_kelurahan = 'ids kelurahan field is number';
                }
            }
        }
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};