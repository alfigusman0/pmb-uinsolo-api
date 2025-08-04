/* Libraries */
const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function validateInput(method, path, data) {
    let errors = {};

    data.idd_kelulusan = !isEmpty(data.idd_kelulusan) ? data.idd_kelulusan : '';
    data.jenjang = !isEmpty(data.jenjang) ? data.jenjang : '';
    data.nama_univ = !isEmpty(data.nama_univ) ? data.nama_univ : '';
    data.status_univ = !isEmpty(data.status_univ) ? data.status_univ : '';
    data.fakultas = !isEmpty(data.fakultas) ? data.fakultas : '';
    data.jurusan = !isEmpty(data.jurusan) ? data.jurusan : '';
    data.akreditasi = !isEmpty(data.akreditasi) ? data.akreditasi : '';
    data.jalur_penyesuaian_studi = !isEmpty(data.jalur_penyesuaian_studi) ? data.jalur_penyesuaian_studi : '';
    data.ipk = !isEmpty(data.ipk) ? data.ipk : '';
    data.tgl_lulus = !isEmpty(data.tgl_lulus) ? data.tgl_lulus : '';
    data.gelar = !isEmpty(data.gelar) ? data.gelar : '';

    if (method === 'POST') {
        if (Validator.isEmpty(data.idd_kelulusan)) {
            errors.idd_kelulusan = 'idd kelulusan field is required';
        } else {
            if (!Validator.isInt(data.idd_kelulusan)) {
                errors.idd_kelulusan = 'idd kelulusan field is number';
            }
        }

        if (Validator.isEmpty(data.jenjang)) {
            errors.jenjang = 'jenjang field is required';
        } else {
            if (!Validator.isIn(data.jenjang, ['S1', 'S2', 'S3'])) {
                errors.jenjang = 'invalid jenjang';
            }
        }

        if (Validator.isEmpty(data.nama_univ)) {
            errors.nama_univ = 'nama univ field is required';
        } else {
            if (!Validator.isLength(data.nama_univ, {
                    min: 1,
                    max: 255
                })) {
                errors.nama_univ = 'invalid nama univ';
            }
        }

        if (Validator.isEmpty(data.status_univ)) {
            errors.status_univ = 'status univ field is required';
        } else {
            if (!Validator.isIn(data.status_univ, ['Negeri', 'Swasta', 'Luar Negeri'])) {
                errors.status_univ = 'invalid status univ';
            }
        }

        if (Validator.isEmpty(data.fakultas)) {
            errors.fakultas = 'fakultas field is required';
        } else {
            if (!Validator.isLength(data.fakultas, {
                    min: 1,
                    max: 255
                })) {
                errors.fakultas = 'invalid fakultas';
            }
        }

        if (Validator.isEmpty(data.jurusan)) {
            errors.jurusan = 'jurusan field is required';
        } else {
            if (!Validator.isLength(data.jurusan, {
                    min: 1,
                    max: 255
                })) {
                errors.jurusan = 'invalid jurusan';
            }
        }

        if (Validator.isEmpty(data.akreditasi)) {
            errors.akreditasi = 'akreditasi field is required';
        } else {
            if (!Validator.isIn(data.akreditasi, ['Terakreditasi', 'Belum Terakreditasi'])) {
                errors.akreditasi = 'invalid akreditasi';
            }
        }

        if (Validator.isEmpty(data.jalur_penyesuaian_studi)) {
            errors.jalur_penyesuaian_studi = 'jalur penyesuaian studi field is required';
        } else {
            if (!Validator.isIn(data.jalur_penyesuaian_studi, ['Skripsi', 'Non-Skripsi'])) {
                errors.jalur_penyesuaian_studi = 'invalid jalur penyesuaian studi';
            }
        }

        if (Validator.isEmpty(data.ipk)) {
            errors.ipk = 'ipk field is required';
        } else {
            if (!Validator.isLength(data.ipk, {
                    min: 1,
                    max: 4
                })) {
                errors.ipk = 'invalid ipk';
            }
        }

        if (Validator.isEmpty(data.tgl_lulus)) {
            errors.tgl_lulus = 'tanggal lulus field is required';
        } else {
            if (!Validator.isDate(data.tgl_lulus)) {
                errors.tgl_lulus = 'invalid tanggal lulus';
            }
        }

        if (Validator.isEmpty(data.gelar)) {
            errors.gelar = 'gelar field is required';
        } else {
            if (!Validator.isLength(data.gelar, {
                    min: 1,
                    max: 15
                })) {
                errors.gelar = 'invalid gelar';
            }
        }
    } else if (method === 'PUT') {
        if (!Validator.isEmpty(data.idd_kelulusan)) {
            if (!Validator.isInt(data.idd_kelulusan)) {
                errors.idd_kelulusan = 'idd kelulusan field is number';
            }
        }

        if (!Validator.isEmpty(data.jenjang)) {
            if (!Validator.isIn(data.jenjang, ['S1', 'S2', 'S3'])) {
                errors.jenjang = 'invalid jenjang';
            }
        }

        if (!Validator.isEmpty(data.nama_univ)) {
            if (!Validator.isLength(data.nama_univ, {
                    min: 1,
                    max: 255
                })) {
                errors.nama_univ = 'invalid nama univ';
            }
        }

        if (!Validator.isEmpty(data.status_univ)) {
            if (!Validator.isIn(data.status_univ, ['Negeri', 'Swasta', 'Luar Negeri'])) {
                errors.status_univ = 'invalid status univ';
            }
        }

        if (!Validator.isEmpty(data.fakultas)) {
            if (!Validator.isLength(data.fakultas, {
                    min: 1,
                    max: 255
                })) {
                errors.fakultas = 'invalid fakultas';
            }
        }

        if (!Validator.isEmpty(data.jurusan)) {
            if (!Validator.isLength(data.jurusan, {
                    min: 1,
                    max: 255
                })) {
                errors.jurusan = 'invalid jurusan';
            }
        }

        if (!Validator.isEmpty(data.akreditasi)) {
            if (!Validator.isIn(data.akreditasi, ['Terakreditasi', 'Belum Terakreditasi'])) {
                errors.akreditasi = 'invalid akreditasi';
            }
        }

        if (!Validator.isEmpty(data.jalur_penyesuaian_studi)) {
            if (!Validator.isIn(data.jalur_penyesuaian_studi, ['Skripsi', 'Non-Skripsi'])) {
                errors.jalur_penyesuaian_studi = 'invalid jalur penyesuaian studi';
            }
        }

        if (!Validator.isEmpty(data.ipk)) {
            if (!Validator.isLength(data.ipk, {
                    min: 1,
                    max: 4
                })) {
                errors.ipk = 'invalid ipk';
            }
        }

        if (!Validator.isEmpty(data.tgl_lulus)) {
            if (!Validator.isDate(data.tgl_lulus)) {
                errors.tgl_lulus = 'invalid tanggal lulus';
            }
        }

        if (!Validator.isEmpty(data.gelar)) {
            if (!Validator.isLength(data.gelar, {
                    min: 1,
                    max: 15
                })) {
                errors.gelar = 'invalid gelar';
            }
        }
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};