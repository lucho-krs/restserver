const { Router } = require('express');
const { check } = require('express-validator');

const { 
    fileUpload,
    updateImg
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

module.exports = router;