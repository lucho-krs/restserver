const { Router } = require('express');
const { check } = require('express-validator');

const { categoryExist } = require('../helpers/db-validators');

const {
    validateJWT,
    validateData,
    isAdminRole,
    hasRole
} = require('../middleware');

const {
    getCategories,
    getCategory,
    postCategory,
    putCategory,
    deleteCategory  
} = require('../controllers/category');

const router = Router() 

router.get('/', getCategories);

router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateData
], postCategory);

router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( categoryExist ),
    validateData
], getCategory);

// token
router.put('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( categoryExist ),
    validateData
], putCategory);

// admin
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    hasRole('ADMIN_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( categoryExist ),
    validateData
], deleteCategory);


module.exports = router;