/* Libraries */
const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function validateInput(method, data) {
    let errors = {};

    data.idd_kelulusan = !isEmpty(data.idd_kelulusan) ? data.idd_kelulusan : '';

    if (method === 'POST') {} else if (method === 'PUT') {}

    return {
        errors,
        isValid: isEmpty(errors),
    };
};