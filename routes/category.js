const { Router } = require('express');
const { check } = require('express-validator');

const { 
    categoryExist,
    categoryExistById
} = require('../helpers/db-validators');

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
    check('id').custom( categoryExistById ),
    validateData
], getCategory);

router.put('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( categoryExistById ),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('name').custom( categoryExist ),
    validateData
], putCategory);

router.delete('/:id', [
    validateJWT,
    isAdminRole,
    hasRole('ADMIN_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( categoryExistById ),
    validateData
], deleteCategory);


module.exports = router;