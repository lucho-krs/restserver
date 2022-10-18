const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/generateJWT');
const { googleVerify } = require('../helpers/google-verify');

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });
        if ( !user ) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos'
            });
        };

        if ( !user.status ) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos estado: falso'
            });
        };

        const validPassword = await bcryptjs.compareSync( password, user.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos'
            });
        };

        const token = await generateJWT( user.id );

        res.json({
            user,
            token
        });

    } catch (error) {

        console.log(error);
        return res.json({ 
            msg: 'Hable con el administrador'
        });

    }
    
};

const googleSignIn = async(req, res = response) => {

    const { id_token } = req.body;

    try {
        
        const googleUser = await googleVerify( id_token );

        res.json({
            id_token,
            googleUser
        });

    } catch ( error ) {
        
        console.log( error );
        
    }

    

}


module.exports = { 
    login,
    googleSignIn
};