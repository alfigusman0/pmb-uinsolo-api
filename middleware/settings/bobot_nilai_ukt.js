/* Helpers */
const response = require('../../helpers/response');
/* Validation */
const validation = require('../../validation/settings/bobot_nilai_ukt');

module.exports = async (req, res, next) => {
    /* Validation */
    let {
        errors,
        isValid
    } = validation(req.method, req.body);
    if (!isValid) {
        let message = errors;
        let json = {};
        return response.sc400(message, json, res);
    }

    next();
};