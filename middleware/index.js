const validateJWT = require('../middleware/validate-jwt');
const validateData = require('../middleware/validate-data');
const validateRoles = require('../middleware/validate-role');


module.exports = {
    ...validateJWT,
    ...validateData,
    ...validateRoles,
};