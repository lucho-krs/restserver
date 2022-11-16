const { Router } = require('express');
const { check } = require('express-validator');

const { uploadFile } = require('../controllers/upload');

const { validateData } = require('../middleware/validate-data');

const router = Router();

router.post( '/', uploadFile );

module.exports = router;