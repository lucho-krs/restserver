const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFile = ( { file }, validateExtensions = [ 'png', 'jpg', 'jpeg', 'gif' ], folder = '' ) => {

    return new Promise( (resolve, reject) => {

        const cutName = file.name.split('.');
        const extension = cutName[ cutName.length - 1 ];
        
        if ( !validateExtensions.includes( extension ) ) {
            
            return reject( `La extension ${ extension } no es valida, extensiones permitidas: ${ validateExtensions }` )
    
        };
    
        const nameTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join( __dirname, '../uploads', folder, nameTemp );
    
        file.mv(uploadPath, ( err ) => {
            if ( err ) {
                return reject( err );
            };
    
            return resolve( `Archivo ${ nameTemp }` );
    
        });
    });

};

module.exports = {
    uploadFile
};