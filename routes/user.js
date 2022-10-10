const { Router } = require('express');
const { check } = require('express-validator');

const { validateData } = require('../middleware/validate-data');
const { 
    isValidRole,
    existEmail
} = require('../helpers/db-validators');

const { 
    getUser,
    putUser, 
    postUser, 
    deleteUser 
} = require('../controllers/user');

const router = Router() 

router.get('/', getUser);
router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser mas de 6 caracteres').isLength({ min: 6 }),
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom( existEmail ),
    check('role').custom( isValidRole ),
    validateData
], postUser);
router.put('/:id', putUser);
router.delete('/:id', deleteUser);

module.exports = router;