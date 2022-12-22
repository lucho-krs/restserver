const jwt = require('jsonwebtoken');
const { User } = require('../models');

const generateJWT = ( uid = '' ) => {

    return new Promise( (resolve, reject) => {

        const payload = { uid };

        jwt.sign( payload, process.env.PRIVATE_KEY, {
            expiresIn: '4h'
        }, ( err, token ) => {

            if ( err ) {
                console.log( err );
                reject('No se pudo generar token');
            } else {
                resolve( token );   
            }
        });

    });

};

const checkToken = async( token = '' ) => {

    try {

        if ( token.length < 5 ) {

            return null;

        };

        const { uid } = jwt.verify( token, process.env.PRIVATE_KEY );
        const user = await User.findById( uid );
        
        if ( user ) {
            
            if ( user.status ) {

                return user;

            } else {

                return null;

            };

        } else {

            return null;

        };
        
    } catch (error) {

        return null;
        
    };

};

module.exports = {
    generateJWT,
    checkToken
};