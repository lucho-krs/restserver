const Role = require('../models/role');

const isValidRole = async(role = '') => {

    const existRole = await Role.findOne({ role });
    if (!existRole) {
        throw new Error(`El rol ${ role } no está en la BD`)
    }

};

module.exports = {
    isValidRole
}