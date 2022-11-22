const { 
    uploadFile,
    productExistById,
    userExist
} = require('../helpers');
// const { User, Product } = require('../models');

const fileUpload = async( req, res ) => {

    try {

        console.log('req.files>', req.files);
        const nameFile = await uploadFile( req.files, undefined, 'imgs' );
        res.json({ nameFile });

    } catch (error) {
        
        console.log('error>');
        res.status(400).json({ error });

    };

};

const updateImg = async( req, res ) => {

    const { collection, id } = req.params;
    let model;

    switch ( collection ) {
        case 'users':
            model = await userExist( id );
            break;
        case 'users':
            model = await productExistById( id );
            break;
        default:
            return res.status(500).json({
                msg: 'No se ha realizado esta validacion aun'
            });
    };

    const name = await uploadFile( req.files, undefined, collection );
    model.img = name;

    await model.save();
    res.json( model );

};

module.exports = {
    fileUpload,
    updateImg
};