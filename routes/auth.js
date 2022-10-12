const { Router } = require('express');
const { check } = require('express-validator');

const { validateData } = require('../middleware/validate-data');
const { 
    emailExist
} = require('../helpers/db-validators');

const {
    login
} = require('../controllers/auth');

const router = Router() 

router.post('/login', [
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    validateData
], login);

module.exports = router;