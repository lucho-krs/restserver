const fs = require('fs');
const path = require('path');

const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL );

const { 
    User, 
    Product 
} = require('../models');
const { 
    uploadFile,
    productExistById,
    userExist
} = require('../helpers');

const fileUpload = async( req, res ) => {

    try {

        const nameFile = await uploadFile( req.files, undefined, 'imgs' );
        res.json({ nameFile });

    } catch (error) {
        
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
        case 'products':
            model = await productExistById( id );
            break;
        default:
            return res.status(500).json({
                msg: 'No se ha realizado esta validacion aun'
            });
    };

    if ( model.img ) {

        const arrName = model.img.split('/');
        const name = arrName[ arrName.length - 1 ];
        const [ public_id ] = name.split('.');
        cloudinary.uploader.destroy( public_id );
        
    };

    const { tempFilePath } = req.files.file;
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
    model.img = secure_url;

    await model.save();
    res.json( model );

};

const getImages = async( req, res ) => {

    const { collection, id } = req.params;
    let model;

    switch ( collection ) {
        case 'users':

            model = await User.findById( id );
            if ( !model ) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                });
            };

        break;
        case 'products':
            
            model = await Product.findById( id );
            if ( !model ) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${ id }`
                });
            };

        break;
        default:
            return res.status(500).json({
                msg: 'No se ha realizado esta validacion aun'
            });
    };

    if ( model.img ) {
        
        let pathImg = path.join( __dirname, '../uploads', collection, model.img );
        if ( fs.existsSync( pathImg ) ) {

            return res.sendFile( pathImg );

        };
        
    };

    pathImg = path.join( __dirname, '../assets/no-image.jpg' );

    return res.sendFile( pathImg );

}; 

module.exports = {
    fileUpload,
    updateImg,
    getImages
};