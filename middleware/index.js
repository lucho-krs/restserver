const validateJWT = require('../middleware/validate-jwt');
const validateData = require('../middleware/validate-data');
const validateRoles = require('../middleware/validate-role');
const validateFiles = require('../middleware/validate-file');


module.exports = {
    ...validateJWT,
    ...validateData,
    ...validateRoles,
    ...validateFiles,
};