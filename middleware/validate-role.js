const isAdminRole = ( req, res, next ) => {

    if ( !req.userAuth ) {

        return res.status(500).json({
            msg: 'No exite este usuario'
        });
        
    };

    const { role, name } = req.userAuth;

    if ( role !== 'ADMIN_ROLE') {

        return res.status(500).json({
            msg: `${ name } no es administrador`
        });
        
    };

    next();

};

const hasRole = ( ...roles ) => {

    return ( req, res, next ) => {

        if ( !req.userAuth ) {

            return res.status(500).json({
                msg: 'No exite este usuario'
            });
            
        };

        if ( !roles.includes( req.userAuth.role ) ) {
            
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${ roles }`
            });

        };

        next();

    };

};

module.exports = {
    isAdminRole,
    hasRole
};