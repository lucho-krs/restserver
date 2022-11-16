const path = require('path');

const uploadFile = ( req, res ) => {

    if (!req.files || Object.keys( req.files ).length === 0 || !req.files.file ) {

        res.status(400).json({
            msg: 'No hay archivo que subir'
        });
        return;
        
    };

    const { file } = req.files;
    const uploadPath = path.join( __dirname, '../uploads', file.name);

    // Use the mv() method to place the file somewhere on your server
    file.mv(uploadPath, function(err) {
        if (err) {
            return res.status(500).json({err});
        };

        res.json({ 
            msg: `Archivo subido en ${ uploadPath }`
        });

    });

};

module.exports = {
    uploadFile
};