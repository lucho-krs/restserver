const { Router } = require('express');
const { check } = require('express-validator');

const { fileUpload } = require('../controllers/upload');
const { validateData } = require('../middleware/validate-data');

const router = Router();

router.post( '/', fileUpload );

module.exports = router;