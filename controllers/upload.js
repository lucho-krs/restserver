const path = require('path');
const { uploadFile } = require('../helpers');

const fileUpload = async( req, res ) => {

    if (!req.files || Object.keys( req.files ).length === 0 || !req.files.file ) {

        res.status(400).json({
            msg: 'No hay archivo que subir'
        });
        return;
        
    };

    const nameFile = await uploadFile( req.files );

    res.json({ nameFile });

};

module.exports = {
    fileUpload
};