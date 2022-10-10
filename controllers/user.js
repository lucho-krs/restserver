const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const getUser = (req, res = response) => {
    const query = req.query;

    res.json({
        msg: 'get controllers',
        query
    });
}

const postUser = async(req, res = response) => {
    
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);


    await user.save();

    res.json({
        msg: 'post controllers',
        user
    });

}

const putUser = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...rest } = req.body;

    // Validar id en la base de datos
    if ( password ) {
        // Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate( id, rest );

    res.json({
        msg: 'put controllers',
        user
    });
}

const deleteUser = (req, res = response) => {
    const id = req.params.id;
    
    res.json({
        msg: 'delete controllers'
    });
}

module.exports = {
    getUser,
    putUser,
    postUser,
    deleteUser
}