const { Router } = require('express');
const { check } = require('express-validator');

const { validateData } = require('../middleware/validate-data');

const {
    login,
    googleSignIn
} = require('../controllers/auth');

const router = Router() 

router.post('/login', [
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    validateData
], login);

router.post('/google', [
    check('id_token', 'El id_token de google es obligatorio').not().isEmpty(),
    validateData
], googleSignIn);

module.exports = router;