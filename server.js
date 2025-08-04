// load env
require('dotenv').config();

// import libraries
const express = require('express');
const cors = require('cors');
const helmet = require("helmet");
const bodyParser = require('body-parser');
const morgan = require('morgan');
const compression = require("compression");

// initialize
const app = express()
const router = express.Router();

// helmet
app.use(helmet());

// morgan
app.use(morgan('dev'));

// body parser
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({
    limit: "500mb",
    extended: true,
    parameterLimit: 50000
}))
app.use(bodyParser.json({
    limit: "500mb",
    extended: true,
    parameterLimit: 50000
}))

// Parse form-urlencoded
app.use(express.json({
    limit: "500mb"
}));
app.use(express.urlencoded({
    limit: "500mb",
    extended: true
}));

// cros middleware
app.use(cors());

// compression
app.use(compression());

if (process.env.NODE_ENV === 'production') {
    // whitelist ip address for production
    app.use((req, res, next) => {
        // allowed ips by env
        const allowedIps = process.env.ALLOWED_IPS.split(',');
        const clientIp = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip).split(',')[0].trim();
        if (allowedIps.includes(clientIp)) {
            next();
        } else {
            console.log('Forbidden, your ip is not allowed to access this resource. your ip is ' + clientIp);
            res.status(403).send('Forbidden, your ip is not allowed to access this resource. your ip is ' + clientIp);
        }
    });
}

const authRoutes = require('./routes/auth');
const awsRoutes = require('./routes/aws');
const cronejobRoutes = require('./routes/cronejob');
const usersRoutes = require('./routes/users');
/* Daftar */
const fileDRoutes = require('./routes/daftar/file');
const kelulusanDRoutes = require('./routes/daftar/kelulusan');
const mahasiswaDRoutes = require('./routes/daftar/mahasiswa');
const orangtuaDRoutes = require('./routes/daftar/orangtua');
const pembayaranDRoutes = require('./routes/daftar/pembayaran');
const pendidikanDRoutes = require('./routes/daftar/pendidikan');
const rumahDRoutes = require('./routes/daftar/rumah');
const sekolahDRoutes = require('./routes/daftar/sekolah');
const uktDRoutes = require('./routes/daftar/ukt');
/* Settings */
const settingBobotJurusanRoutes = require('./routes/settings/bobot_jurusan');
const settingBobotNilaiUktRoutes = require('./routes/settings/bobot_nilai_ukt');
const settingBobotRangeUktRoutes = require('./routes/settings/bobot_range_ukt');
const settingDayaTampungRoutes = require('./routes/settings/daya_tampung');
const settingGrupRoutes = require('./routes/settings/grup');
const settingHakAksesRoutes = require('./routes/settings/hak_akses');
const settingJadwalRoutes = require('./routes/settings/jadwal');
const settingJalurMasukRoutes = require('./routes/settings/jalur_masuk');
const settingJurusanRoutes = require('./routes/settings/jurusan');
const settingLevelRoutes = require('./routes/settings/level');
const settingModulRoutes = require('./routes/settings/modul');
const settingProgramRoutes = require('./routes/settings/program');
const settingSanggahRoutes = require('./routes/settings/sanggah');
const settingSliderRoutes = require('./routes/settings/slider');
const settingSubDayaTampungRoutes = require('./routes/settings/sub_daya_tampung');
const settingTipeFileRoutes = require('./routes/settings/tipe_file');
const settingTipeUjianRoutes = require('./routes/settings/tipe_ujian');

// use routes
router.use('/auth', authRoutes);
router.use('/aws', awsRoutes);
router.use('/cronejob', cronejobRoutes);
router.use('/users', usersRoutes);
/* Daftar */
router.use('/daftar/file', fileDRoutes);
router.use('/daftar/kelulusan', kelulusanDRoutes);
router.use('/daftar/mahasiswa', mahasiswaDRoutes);
router.use('/daftar/orangtua', orangtuaDRoutes);
router.use('/daftar/pembayaran', pembayaranDRoutes);
router.use('/daftar/pendidikan', pendidikanDRoutes);
router.use('/daftar/rumah', rumahDRoutes);
router.use('/daftar/sekolah', sekolahDRoutes);
router.use('/daftar/ukt', uktDRoutes);
/* Settings */
router.use('/settings/bobot-jurusan', settingBobotJurusanRoutes);
router.use('/settings/bobot-nilai-ukt', settingBobotNilaiUktRoutes);
router.use('/settings/bobot-range-ukt', settingBobotRangeUktRoutes);
router.use('/settings/daya-tampung', settingDayaTampungRoutes);
router.use('/settings/grup', settingGrupRoutes);
router.use('/settings/hak-akses', settingHakAksesRoutes);
router.use('/settings/jadwal', settingJadwalRoutes);
router.use('/settings/jalur-masuk', settingJalurMasukRoutes);
router.use('/settings/jurusan', settingJurusanRoutes);
router.use('/settings/level', settingLevelRoutes);
router.use('/settings/modul', settingModulRoutes);
router.use('/settings/program', settingProgramRoutes);
router.use('/settings/sanggah', settingSanggahRoutes);
router.use('/settings/slider', settingSliderRoutes);
router.use('/settings/sub-daya-tampung', settingSubDayaTampungRoutes);
router.use('/settings/tipe-file', settingTipeFileRoutes);
router.use('/settings/tipe-ujian', settingTipeUjianRoutes);

app.use('/v2/api', router);
app.use('/v2/api', (req, res, next) => {
    res.status(200).json({
        status: "OK",
        message: "Server is healthy",
        timestamp: Date.now(),
    });
})

app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})