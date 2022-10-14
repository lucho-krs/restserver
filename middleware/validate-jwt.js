const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async( req, res, next ) => {
    
    const token = req.header('x-token');

    if ( !token ) {  

        return res.status(401).json({ 
            msg: 'No hay token en la petición'
        });

    }

    try {

        const { uid } = jwt.verify( token, process.env.PRIVATE_KEY );
        const userLogin = await User.findById( uid );

        if ( !userLogin) {
           
            return res.status(401).json({ 
                msg: 'Token no valido - usuario no existe en DB'
            });

        }

        if ( !userLogin.status ) {

            return res.status(401).json({ 
                msg: 'Token no valido - usuario con estado false'
            });

        }
        
        req.userAuth = userLogin;

        next();
         
    } catch (error) {

        console.log(error);
        res.status(401).json({ 
            msg: 'Token invalido'
        });
        
    }

};

module.exports = {
    validateJWT
}

