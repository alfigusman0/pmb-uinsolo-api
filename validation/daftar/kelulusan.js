/* Libraries */
const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function validateInput(method, path, data) {
    let errors = {};

    data.id_user = !isEmpty(data.id_user) ? data.id_user : '';
    data.nomor_peserta = !isEmpty(data.nomor_peserta) ? data.nomor_peserta : '';
    data.nim = !isEmpty(data.nim) ? data.nim : '';
    data.nama = !isEmpty(data.nama) ? data.nama : '';
    data.kode_jurusan = !isEmpty(data.kode_jurusan) ? data.kode_jurusan : '';
    data.ids_konsentrasi = !isEmpty(data.ids_konsentrasi) ? data.ids_konsentrasi : '';
    data.ids_jalur_masuk = !isEmpty(data.ids_jalur_masuk) ? data.ids_jalur_masuk : '';
    data.ids_tipe_ujian = !isEmpty(data.ids_tipe_ujian) ? data.ids_tipe_ujian : '';
    data.ids_konsentrasi = !isEmpty(data.ids_konsentrasi) ? data.ids_konsentrasi : '';
    data.tahun = !isEmpty(data.tahun) ? data.tahun : '';
    data.daftar = !isEmpty(data.daftar) ? data.daftar : '';
    data.tgl_daftar = !isEmpty(data.tgl_daftar) ? data.tgl_daftar : '';
    data.submit = !isEmpty(data.submit) ? data.submit : '';
    data.tgl_submit = !isEmpty(data.tgl_submit) ? data.tgl_submit : '';
    data.pembayaran = !isEmpty(data.pembayaran) ? data.pembayaran : '';
    data.tgl_pembayaran = !isEmpty(data.tgl_pembayaran) ? data.tgl_pembayaran : '';
    data.ket_pembayaran = !isEmpty(data.ket_pembayaran) ? data.ket_pembayaran : '';
    data.pemberkasan = !isEmpty(data.pemberkasan) ? data.pemberkasan : '';
    data.tgl_pemberkasan = !isEmpty(data.tgl_pemberkasan) ? data.tgl_pemberkasan : '';
    data.kelas = !isEmpty(data.kelas) ? data.kelas : '';

    if (method === 'POST') {
        if (!Validator.isEmpty(data.id_user)) {
            if (!Validator.isInt(data.id_user)) {
                errors.id_user = 'id_user field is number';
            }
        }

        if (Validator.isEmpty(data.nomor_peserta)) {
            errors.nomor_peserta = 'nomor peserta field is required';
        } else {
            if (!Validator.isLength(data.nomor_peserta, {
                    min: 10,
                    max: 16
                })) {
                errors.nomor_peserta = 'nomor peserta must be at least 10 characters but not more than 16 characters .';
            }
        }

        if (!Validator.isEmpty(data.nim)) {
            if (!Validator.isLength(data.nim, {
                    min: 10,
                    max: 16
                })) {
                errors.nim = 'nim must be at least 10 characters but not more than 16 characters .';
            }
        }

        if (Validator.isEmpty(data.nama)) {
            errors.nama = 'nama field is required';
        } else {
            if (!Validator.isLength(data.nama, {
                    min: 2,
                    max: 100
                })) {
                errors.nama = 'nama must be at least 2 characters but not more than 100 characters .';
            }
        }

        if (Validator.isEmpty(data.kode_jurusan)) {
            errors.kode_jurusan = 'kode jurusan field is required';
        } else {
            if (!Validator.isLength(data.kode_jurusan, {
                    min: 1,
                    max: 16
                })) {
                errors.kode_jurusan = 'kode jurusan must be at least 2 characters but not more than 16 characters .';
            }
        }

        if (!Validator.isEmpty(data.ids_konsentrasi)) {
            if (!Validator.isInt(data.ids_konsentrasi)) {
                errors.ids_konsentrasi = 'ids konsentrasi field is number';
            }
        }

        if (Validator.isEmpty(data.ids_jalur_masuk)) {
            errors.ids_jalur_masuk = 'ids jalur masuk field is required';
        } else {
            if (!Validator.isInt(data.ids_jalur_masuk)) {
                errors.ids_jalur_masuk = 'ids jalur masuk field is number';
            }
        }

        if (!Validator.isEmpty(data.ids_tipe_ujian)) {
            if (!Validator.isInt(data.ids_tipe_ujian)) {
                errors.ids_tipe_ujian = 'ids tipe ujian field is number';
            }
        }

        if (Validator.isEmpty(data.tahun)) {
            errors.tahun = 'tahun field is required';
        } else {
            if (!Validator.isLength(data.tahun, {
                    min: 4,
                    max: 4
                })) {
                errors.tahun = 'tahun must be at least 4 characters but not more than 4 characters .';
            }
        }

        if (Validator.isEmpty(data.daftar)) {
            errors.daftar = 'daftar field is required';
        } else {
            if (!Validator.isIn(data.daftar, ['BELUM', 'SUDAH'])) {
                errors.daftar = 'daftar must be BELUM or SUDAH';
            }
        }

        if (!Validator.isEmpty(data.tgl_daftar)) {
            // Additional regex for format YYYY-MM-DD HH:mm:ss
            const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;
            if (!regex.test(data.tgl_daftar)) {
                errors.tgl_daftar = 'invalid tgl_daftar.';
            }
        }

        if (Validator.isEmpty(data.submit)) {
            errors.submit = 'submit field is required';
        } else {
            if (!Validator.isIn(data.submit, ['BELUM', 'SUDAH'])) {
                errors.submit = 'submit must be BELUM or SUDAH';
            }
        }

        if (!Validator.isEmpty(data.tgl_submit)) {
            // Additional regex for format YYYY-MM-DD HH:mm:ss
            const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;
            if (!regex.test(data.tgl_submit)) {
                errors.tgl_submit = 'invalid tgl_submit.';
            }
        }

        if (Validator.isEmpty(data.pembayaran)) {
            errors.pembayaran = 'pembayaran field is required';
        } else {
            if (!Validator.isIn(data.pembayaran, ['BELUM', 'SUDAH'])) {
                errors.pembayaran = 'pembayaran must be BELUM or SUDAH';
            }
        }

        if (!Validator.isEmpty(data.tgl_pembayaran)) {
            // Additional regex for format YYYY-MM-DD HH:mm:ss
            const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;
            if (!regex.test(data.tgl_pembayaran)) {
                errors.tgl_pembayaran = 'invalid tgl_pembayaran.';
            }
        }

        if (!Validator.isEmpty(data.ket_pembayaran)) {
            if (!Validator.isLength(data.ket_pembayaran, {
                    min: 1,
                    max: 255
                })) {
                errors.ket_pembayaran = 'ket_pembayaran must be at least 1 characters but not more than 255 characters .';
            }
        }

        if (Validator.isEmpty(data.pemberkasan)) {
            errors.pemberkasan = 'pemberkasan field is required';
        } else {
            if (!Validator.isIn(data.pemberkasan, ['BELUM', 'SUDAH'])) {
                errors.pemberkasan = 'pemberkasan must be BELUM or SUDAH';
            }
        }

        if (!Validator.isEmpty(data.tgl_pemberkasan)) {
            // Additional regex for format YYYY-MM-DD HH:mm:ss
            const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;
            if (!regex.test(data.tgl_pemberkasan)) {
                errors.tgl_pemberkasan = 'invalid tgl_pemberkasan.';
            }
        }

        if (!Validator.isEmpty(data.kelas)) {
            if (!Validator.isLength(data.kelas, {
                    min: 1,
                    max: 2
                })) {
                errors.kelas = 'kelas must be at least 1 characters but not more than 2 characters .';
            }
        }
    } else if (method === 'PUT') {
        if (!Validator.isEmpty(data.id_user)) {
            if (!Validator.isInt(data.id_user)) {
                errors.id_user = 'id_user field is number';
            }
        }

        if (!Validator.isEmpty(data.nomor_peserta)) {
            if (!Validator.isLength(data.nomor_peserta, {
                    min: 10,
                    max: 16
                })) {
                errors.nomor_peserta = 'nomor peserta must be at least 10 characters but not more than 16 characters .';
            }
        }

        if (!Validator.isEmpty(data.nim)) {
            if (!Validator.isLength(data.nim, {
                    min: 10,
                    max: 16
                })) {
                errors.nim = 'nim must be at least 10 characters but not more than 16 characters .';
            }
        }

        if (!Validator.isEmpty(data.nama)) {
            if (!Validator.isLength(data.nama, {
                    min: 2,
                    max: 100
                })) {
                errors.nama = 'nama must be at least 2 characters but not more than 100 characters .';
            }
        }

        if (!Validator.isEmpty(data.kode_jurusan)) {
            if (!Validator.isLength(data.kode_jurusan, {
                    min: 1,
                    max: 16
                })) {
                errors.kode_jurusan = 'kode jurusan must be at least 2 characters but not more than 16 characters .';
            }
        }

        if (!Validator.isEmpty(data.ids_konsentrasi)) {
            if (!Validator.isInt(data.ids_konsentrasi)) {
                errors.ids_konsentrasi = 'ids konsentrasi field is number';
            }
        }

        if (!Validator.isEmpty(data.ids_jalur_masuk)) {
            if (!Validator.isInt(data.ids_jalur_masuk)) {
                errors.ids_jalur_masuk = 'ids jalur masuk field is number';
            }
        }

        if (!Validator.isEmpty(data.ids_tipe_ujian)) {
            if (!Validator.isInt(data.ids_tipe_ujian)) {
                errors.ids_tipe_ujian = 'ids tipe ujian field is number';
            }
        }

        if (!Validator.isEmpty(data.tahun)) {
            if (!Validator.isLength(data.tahun, {
                    min: 4,
                    max: 4
                })) {
                errors.tahun = 'tahun must be at least 4 characters but not more than 4 characters .';
            }
        }

        if (!Validator.isEmpty(data.daftar)) {
            if (!Validator.isIn(data.daftar, ['BELUM', 'SUDAH'])) {
                errors.daftar = 'daftar must be BELUM or SUDAH';
            }
        }

        if (!Validator.isEmpty(data.tgl_daftar)) {
            // Additional regex for format YYYY-MM-DD HH:mm:ss
            const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;
            if (!regex.test(data.tgl_daftar)) {
                errors.tgl_daftar = 'invalid tgl_daftar.';
            }
        }

        if (!Validator.isEmpty(data.submit)) {
            if (!Validator.isIn(data.submit, ['BELUM', 'SUDAH'])) {
                errors.submit = 'submit must be BELUM or SUDAH';
            }
        }

        if (!Validator.isEmpty(data.tgl_submit)) {
            // Additional regex for format YYYY-MM-DD HH:mm:ss
            const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;
            if (!regex.test(data.tgl_submit)) {
                errors.tgl_submit = 'invalid tgl_submit.';
            }
        }

        if (!Validator.isEmpty(data.pembayaran)) {
            if (!Validator.isIn(data.pembayaran, ['BELUM', 'SUDAH'])) {
                errors.pembayaran = 'pembayaran must be BELUM or SUDAH';
            }
        }

        if (!Validator.isEmpty(data.tgl_pembayaran)) {
            // Additional regex for format YYYY-MM-DD HH:mm:ss
            const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;
            if (!regex.test(data.tgl_pembayaran)) {
                errors.tgl_pembayaran = 'invalid tgl_pembayaran.';
            }
        }

        if (!Validator.isEmpty(data.ket_pembayaran)) {
            if (!Validator.isLength(data.ket_pembayaran, {
                    min: 1,
                    max: 255
                })) {
                errors.ket_pembayaran = 'ket_pembayaran must be at least 1 characters but not more than 255 characters .';
            }
        }

        if (!Validator.isEmpty(data.pemberkasan)) {
            if (!Validator.isIn(data.pemberkasan, ['BELUM', 'SUDAH'])) {
                errors.pemberkasan = 'pemberkasan must be BELUM or SUDAH';
            }
        }

        if (!Validator.isEmpty(data.tgl_pemberkasan)) {
            // Additional regex for format YYYY-MM-DD HH:mm:ss
            const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;
            if (!regex.test(data.tgl_pemberkasan)) {
                errors.tgl_pemberkasan = 'invalid tgl_pemberkasan.';
            }
        }

        if (!Validator.isEmpty(data.kelas)) {
            if (!Validator.isLength(data.kelas, {
                    min: 1,
                    max: 2
                })) {
                errors.kelas = 'kelas must be at least 1 characters but not more than 2 characters .';
            }
        }
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};