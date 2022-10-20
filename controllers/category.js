const { response } = require('express');
const { Category } = require('../models');


const getCategories = async(req, res = response) => {

    res.json({
        msg: 'getCategories'
    });

};

const getCategory = async(req, res = response) => {

    res.json({
        msg: 'getCategory'
    });

};

const postCategory = async(req, res = response) => {

    const name = req.body.name.toUpperCase();
    const categoryDB = await Category.findOne({ name });

    if ( categoryDB ) {

        return res.status(400).json({
            msg: `La categoria ${ categoryDB.name }, ya existe`
        });

    };

    const data = {
        name,
        user: req.userAuth._id
    };

    const category = new Category( data );
    await category.save();

    res.status(201).json({
        category
    });

};

const putCategory = async(req, res = response) => {

    res.json({
        msg: 'putCategory'
    });

};

const deleteCategory = async(req, res = response) => {

    res.json({
        msg: 'deleteCategory'
    });

};

module.exports = {
    getCategories,
    getCategory,
    postCategory,
    putCategory,
    deleteCategory
};