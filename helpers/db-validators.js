const { 
    Category,
    Role,
    User,
    Product
} = require('../models');

const isValidRole = async( role = '' ) => {

    const existRole = await Role.findOne({ role });
    if ( !existRole ) {

        throw new Error(`El rol ${ role } no está en la BD`);

    };

};

const emailExist = async( email = '' ) => {

    const emailExist = await User.findOne({ email });
    if ( emailExist ) {

        throw new Error(`El correo ${ email } ya está registrado`);

    };

};

const userExist = async( id = '' ) => {

    const userExist = await User.findById( id );
    if ( !userExist ) {

        throw new Error(`El id ${ id } NO existe en la BD`);

    };

};

const categoryExist = async( name = '' ) => {

    name = name.toUpperCase();

    const categoryDB = await Category.findOne({ name });
    if ( categoryDB ) {

        throw new Error(`La categoria ${ name }, ya existe`);

    };

};

const categoryExistById = async( id = '' ) => {

    const categoryExist = await Category.findById( id );
    if ( !categoryExist ) {

        throw new Error(`El id ${ id } NO existe en la BD`);

    };

};

const productExistById = async( id = '' ) => {

    const productExist = await Product.findById( id );
    if ( !productExist ) {

        throw new Error(`El id ${ id } NO existe en la BD`);

    };

};

const productExist = async( name = '' ) => {

    name = name.toUpperCase();

    const productDB = await Product.findOne({ name });
    if ( productDB ) {

        throw new Error(`El producto ${ name }, ya existe`);

    };

};

module.exports = {
    isValidRole,
    emailExist,
    userExist,
    categoryExistById,
    categoryExist,
    productExistById,
    productExist
};