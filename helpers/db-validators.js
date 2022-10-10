const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async( role = '' ) => {

    const existRole = await Role.findOne({ role });
    if ( !existRole ) {
        throw new Error(`El rol ${ role } no está en la BD`)
    }

};

const emailExist = async( email = '' ) => {

    const emailExist = await User.findOne({ email });
    if ( emailExist ) {
        throw new Error(`El correo ${ email } ya está registrado`)
    }

};

const userExist = async( id = '' ) => {

    const userExist = await User.findById( id );
    if ( !userExist ) {
        throw new Error(`El id ${ id } NO existe en la BD`)
    }

};

module.exports = {
    isValidRole,
    emailExist,
    userExist
};