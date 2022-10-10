const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const getUser = async(req, res = response) => {

    const { limit = 5, from = 0 } = req.query;
    const query = { status: true };

    const [ total, users ] = await Promise.all([
        User.countDocuments( query ),
        User.find( query )
            .skip( Number(from) )
            .limit( Number(limit) )
    ]);

    res.json({
        total,
        users
    });

}

const postUser = async(req, res = response) => {
    
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );


    await user.save();

    res.json({
        msg: 'post controllers',
        user
    });

}

const putUser = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...rest } = req.body;

    if ( password ) {
        // Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate( id, rest );

    res.json(user);
}

const deleteUser = async(req, res = response) => {

    const { id } = req.params;

    const user = await User.findByIdAndUpdate( id, { status: false } )
    
    res.json(user);

}

module.exports = {
    getUser,
    putUser,
    postUser,
    deleteUser
}