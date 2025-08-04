/* Helpers */
const response = require('../helpers/response');
/* Validation */
const loginValidation = require('../validation/login');

module.exports = async (req, res, next) => {
    /* Validation */
    let {
        errors,
        isValid
    } = loginValidation(req.body);
    if (!isValid) {
        let message = errors;
        let json = {};
        return response.sc400(message, json, res);
    }

    req.ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    next();
};