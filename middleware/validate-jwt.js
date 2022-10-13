const jwt = require('jsonwebtoken');

const validateJWT = ( req, res, next ) => {
    
    const token = req.header('x-token');

    if ( !token ) {  

        return res.status(401).json({ 
            msg: 'No hay token en la petición'
        });

    }

    try {

        jwt.verify( token, process.env.PRIVATE_KEY );
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

