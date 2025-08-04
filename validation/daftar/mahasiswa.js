/* Libraries */
const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function validateInput(method, data) {
    let errors = {};

    data.idd_kelulusan = !isEmpty(data.idd_kelulusan) ? data.idd_kelulusan : '';
    data.nik = !isEmpty(data.nik) ? data.nik : '';
    data.jenis_kelamin = !isEmpty(data.jenis_kelamin) ? data.jenis_kelamin : '';
    data.tempat_lahir = !isEmpty(data.tempat_lahir) ? data.tempat_lahir : '';
    data.tgl_lahir = !isEmpty(data.tgl_lahir) ? data.tgl_lahir : '';
    data.ids_agama = !isEmpty(data.ids_agama) ? data.ids_agama : '';
    data.kewarganegaraan = !isEmpty(data.kewarganegaraan) ? data.kewarganegaraan : '';
    data.ids_jenis_tinggal = !isEmpty(data.ids_jenis_tinggal) ? data.ids_jenis_tinggal : '';
    data.ids_alat_transportasi = !isEmpty(data.ids_alat_transportasi) ? data.ids_alat_transportasi : '';
    data.terima_kps = !isEmpty(data.terima_kps) ? data.terima_kps : '';
    data.no_kps = !isEmpty(data.no_kps) ? data.no_kps : '';
    data.ids_jenis_pendaftaran = !isEmpty(data.ids_jenis_pendaftaran) ? data.ids_jenis_pendaftaran : '';
    data.ids_jenis_pembiayaan = !isEmpty(data.ids_jenis_pembiayaan) ? data.ids_jenis_pembiayaan : '';
    data.ids_hubungan = !isEmpty(data.ids_hubungan) ? data.ids_hubungan : '';
    data.ukuran_baju = !isEmpty(data.ukuran_baju) ? data.ukuran_baju : '';
    data.ukuran_jas = !isEmpty(data.ukuran_jas) ? data.ukuran_jas : '';

    if (method === 'POST') {
        if (Validator.isEmpty(data.idd_kelulusan)) {
            errors.idd_kelulusan = 'idd kelulusan field is required';
        } else {
            if (!Validator.isInt(data.idd_kelulusan)) {
                errors.idd_kelulusan = 'idd kelulusan field is number';
            }
        }

        if (Validator.isEmpty(data.nik)) {
            errors.nik = 'nik or passport field is required';
        } else {
            if (data.kewarganegaraan == 'WNI') {
                if (!Validator.isLength(data.nik, {
                        min: 16,
                        max: 16
                    })) {
                    errors.nik = 'nik field is 16 character';
                }
            } else {
                if (!Validator.isLength(data.nik, {
                        max: 9
                    })) {
                    errors.nik = 'passport field is 9 character';
                }
            }
        }

        if (Validator.isEmpty(data.jenis_kelamin)) {
            errors.jenis_kelamin = 'jenis kelamin field is required';
        } else {
            if (!(data.jenis_kelamin == 'LAKI-LAKI' || data.jenis_kelamin == 'PEREMPUAN')) {
                errors.jenis_kelamin = 'invalid jenis kelamin';
            }
        }

        if (Validator.isEmpty(data.tempat_lahir)) {
            errors.tempat_lahir = 'tempat lahir field is required';
        }

        if (Validator.isEmpty(data.tgl_lahir)) {
            errors.tgl_lahir = 'tanggal lahir field is required';
        } else {
            if (!Validator.isDate(data.tgl_lahir)) {
                errors.tgl_lahir = 'invalid tanggal lahir';
            }
        }

        if (Validator.isEmpty(data.ids_agama)) {
            errors.ids_agama = 'agama field is required';
        } else {
            if (!Validator.isInt(data.ids_agama)) {
                errors.ids_agama = 'agama field is number';
            }
        }

        if (Validator.isEmpty(data.kewarganegaraan)) {
            errors.kewarganegaraan = 'kewarganegaraan field is required';
        } else {
            if (!(data.kewarganegaraan == 'WNI' || data.kewarganegaraan == 'WNA')) {
                errors.kewarganegaraan = 'invalid kewarganegaraan';
            }
        }

        if (Validator.isEmpty(data.ids_jenis_tinggal)) {
            errors.ids_jenis_tinggal = 'jenis tinggal field is required';
        } else {
            if (!Validator.isInt(data.ids_jenis_tinggal)) {
                errors.ids_jenis_tinggal = 'jenis tinggal field is number';
            }
        }

        if (Validator.isEmpty(data.ids_alat_transportasi)) {
            errors.ids_alat_transportasi = 'alat transportasi field is required';
        } else {
            if (!Validator.isInt(data.ids_alat_transportasi)) {
                errors.ids_alat_transportasi = 'alat transportasi field is number';
            }
        }

        if (Validator.isEmpty(data.terima_kps)) {
            errors.terima_kps = 'terima kps field is required';
        } else {
            if (!(data.terima_kps == 'YA' || data.terima_kps == 'TIDAK')) {
                errors.terima_kps = 'invalid terima kps';
            }
        }

        if (data.terima_kps == 'YA') {
            if (Validator.isEmpty(data.no_kps)) {
                errors.no_kps = 'no kps field is required';
            }
        }

        if (Validator.isEmpty(data.ids_jenis_pendaftaran)) {
            errors.ids_jenis_pendaftaran = 'jenis pendaftaran field is required';
        } else {
            if (!Validator.isInt(data.ids_jenis_pendaftaran)) {
                errors.ids_jenis_pendaftaran = 'jenis pendaftaran field is number';
            }
        }

        if (Validator.isEmpty(data.ids_jenis_pembiayaan)) {
            errors.ids_jenis_pembiayaan = 'jenis pembiayaan field is required';
        } else {
            if (!Validator.isInt(data.ids_jenis_pembiayaan)) {
                errors.ids_jenis_pembiayaan = 'jenis pembiayaan field is number';
            }
        }

        if (Validator.isEmpty(data.ids_hubungan)) {
            errors.ids_hubungan = 'hubungan field is required';
        } else {
            if (!Validator.isInt(data.ids_hubungan)) {
                errors.ids_hubungan = 'hubungan field is number';
            }
        }

        if (Validator.isEmpty(data.ukuran_baju)) {
            errors.ukuran_baju = 'ukuran baju field is required';
        } else {
            if (!(data.ukuran_baju == 'S' || data.ukuran_baju == 'M' || data.ukuran_baju == 'L' || data.ukuran_baju == 'XL' || data.ukuran_baju == 'XXL' || data.ukuran_baju == 'XXXL')) {
                errors.ukuran_baju = 'invalid ukuran baju';
            }
        }

        if (Validator.isEmpty(data.ukuran_jas)) {
            errors.ukuran_jas = 'ukuran jas field is required';
        } else {
            if (!(data.ukuran_jas == 'S' || data.ukuran_jas == 'M' || data.ukuran_jas == 'L' || data.ukuran_jas == 'XL' || data.ukuran_jas == 'XXL' || data.ukuran_jas == 'XXXL')) {
                errors.ukuran_jas = 'invalid ukuran jas';
            }
        }

    } else if (method === 'PUT') {
        if (data.nik !== '') {
            if (!Validator.isEmpty(data.nik) && !Validator.isEmpty(data.kewarganegaraan)) {
                if (data.kewarganegaraan == 'WNI') {
                    if (!Validator.isLength(data.nik, {
                            min: 16,
                            max: 16
                        })) {
                        errors.nik = 'nik field is 16 character';
                    }
                } else {
                    if (!Validator.isLength(data.nik, {
                            max: 9
                        })) {
                        errors.nik = 'passport field is 9 character';
                    }
                }
            }
        }

        if (data.jenis_kelamin !== '') {
            if (!Validator.isEmpty(data.jenis_kelamin)) {
                if (!(data.jenis_kelamin == 'LAKI-LAKI' || data.jenis_kelamin == 'PEREMPUAN')) {
                    errors.jenis_kelamin = 'invalid jenis kelamin';
                }
            }
        }

        if (data.tgl_lahir !== '') {
            if (!Validator.isEmpty(data.tgl_lahir)) {
                if (!Validator.isDate(data.tgl_lahir)) {
                    errors.tgl_lahir = 'invalid tanggal lahir';
                }
            }
        }

        if (data.ids_agama !== '') {
            if (!Validator.isEmpty(data.ids_agama)) {
                if (!Validator.isInt(data.ids_agama)) {
                    errors.ids_agama = 'agama field is number';
                }
            }
        }

        if (data.kewarganegaraan !== '') {
            if (!Validator.isEmpty(data.kewarganegaraan)) {
                if (!(data.kewarganegaraan == 'WNI' || data.kewarganegaraan == 'WNA')) {
                    errors.kewarganegaraan = 'invalid kewarganegaraan';
                }
            }
        }

        if (data.ids_jenis_tinggal !== '') {
            if (!Validator.isEmpty(data.ids_jenis_tinggal)) {
                if (!Validator.isInt(data.ids_jenis_tinggal)) {
                    errors.ids_jenis_tinggal = 'jenis tinggal field is number';
                }
            }
        }

        if (data.ids_alat_transportasi !== '') {
            if (!Validator.isEmpty(data.ids_alat_transportasi)) {
                if (!Validator.isInt(data.ids_alat_transportasi)) {
                    errors.ids_alat_transportasi = 'alat transportasi field is number';
                }
            }
        }

        if (data.terima_kps !== '') {
            if (!Validator.isEmpty(data.terima_kps)) {
                if (!(data.terima_kps == 'YA' || data.terima_kps == 'TIDAK')) {
                    errors.terima_kps = 'invalid terima kps';
                }
            }
        }

        if (data.terima_kps == 'YA') {
            if (data.no_kps !== '') {
                if (!Validator.isEmpty(data.no_kps)) {
                    errors.no_kps = 'no kps field is required';
                }
            }
        }

        if (data.ids_jenis_pendaftaran !== '') {
            if (!Validator.isEmpty(data.ids_jenis_pendaftaran)) {
                if (!Validator.isInt(data.ids_jenis_pendaftaran)) {
                    errors.ids_jenis_pendaftaran = 'jenis pendaftaran field is number';
                }
            }
        }

        if (data.ids_jenis_pembiayaan !== '') {
            if (!Validator.isEmpty(data.ids_jenis_pembiayaan)) {
                if (!Validator.isInt(data.ids_jenis_pembiayaan)) {
                    errors.ids_jenis_pembiayaan = 'jenis pembiayaan field is number';
                }
            }
        }

        if (data.ids_hubungan !== '') {
            if (!Validator.isEmpty(data.ids_hubungan)) {
                if (!Validator.isInt(data.ids_hubungan)) {
                    errors.ids_hubungan = 'hubungan field is number';
                }
            }
        }

        if (data.ukuran_baju !== '') {
            if (!Validator.isEmpty(data.ukuran_baju)) {
                if (!(data.ukuran_baju == 'S' || data.ukuran_baju == 'M' || data.ukuran_baju == 'L' || data.ukuran_baju == 'XL' || data.ukuran_baju == 'XXL' || data.ukuran_baju == 'XXXL')) {
                    errors.ukuran_baju = 'invalid ukuran baju';
                }
            }
        }

        if (data.ukuran_jas !== '') {
            if (!Validator.isEmpty(data.ukuran_jas)) {
                if (!(data.ukuran_jas == 'S' || data.ukuran_jas == 'M' || data.ukuran_jas == 'L' || data.ukuran_jas == 'XL' || data.ukuran_jas == 'XXL' || data.ukuran_jas == 'XXXL')) {
                    errors.ukuran_jas = 'invalid ukuran jas';
                }
            }
        }
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};