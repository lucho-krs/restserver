const { Router } = require('express');
const { check } = require('express-validator');

const {
    validateJWT,
    validateData
} = require('../middleware');

// const { validateData } = require('../middleware/validate-data');

const {
    getCategories,
    getCategory,
    postCategory,
    putCategory,
    deleteCategory  
} = require('../controllers/category');

const router = Router() 

router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateData
], postCategory);


module.exports = router;