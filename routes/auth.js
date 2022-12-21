const { Router } = require('express');
const { check } = require('express-validator');

const { 
    validateJWT ,
    validateData
} = require('../middleware');

const {
    login,
    googleSignIn,
    renewToken
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

router.get('/', validateJWT, renewToken);

module.exports = router;