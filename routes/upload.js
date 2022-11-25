const { Router } = require('express');
const { check } = require('express-validator');

const { 
    fileUpload,
    updateImg,
    getImages
} = require('../controllers/upload');

const { validateData, validateFiles } = require('../middleware');
const { isValidCollections } = require('../helpers');

const router = Router();

router.post( '/', validateFiles, fileUpload );

router.put( '/:collection/:id', [
    validateFiles,
    check('id', 'No es un ID válido').isMongoId(),
    check('collection').custom( c => isValidCollections( c, [ 'users', 'products' ] )),
    validateData
], updateImg );

router.get( '/:collection/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('collection').custom( c => isValidCollections( c, [ 'users', 'products' ] )),
    validateData
], getImages );

module.exports = router;