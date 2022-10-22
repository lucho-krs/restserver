const { Router } = require('express');
const { check } = require('express-validator');

const { 
    productExist,
    productExistById,
    categoryExistById
} = require('../helpers/db-validators');

const {
    validateJWT,
    validateData,
    isAdminRole,
    hasRole
} = require('../middleware');

const {
    getProducts,
    getProduct,
    postProduct,
    putProduct,
    deleteProduct
} = require('../controllers/product');

const router = Router() 

router.get('/', getProducts);

router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('name').custom( productExist ),
    check('category', 'La categoria no es valida').isMongoId(),
    check('category').custom( categoryExistById ),
    check('price', 'El precio debe ser un número valido').isNumeric(),
    validateData
], postProduct);

router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( productExistById ),
    validateData
], getProduct);

router.put('/:id', [
    validateJWT,
    hasRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( productExistById ),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('name').custom( productExist ),
    check('category', 'La categoria no es valida').isMongoId(),
    check('category').custom( categoryExistById ),
    check('price', 'El precio debe ser un número valido mayor a 0').isInt({ min: 0 }),
    validateData
], putProduct);

router.delete('/:id', [
    validateJWT,
    isAdminRole,
    hasRole('ADMIN_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( productExistById ),
    validateData
], deleteProduct);


module.exports = router;