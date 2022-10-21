const { response } = require('express');
const { Category } = require('../models');

const getCategories = async(req, res = response) => {

    const { limit = 5, from = 0 } = req.query;
    const query = { status: true };

    const [ total, category ] = await Promise.all([
        Category.countDocuments( query ),
        Category.find( query )
            .populate( 'user', 'name img' )
            .skip( Number(from) )
            .limit( Number(limit) )
    ]);

    res.json({
        total,
        category
    });

};

const getCategory = async(req, res = response) => {

    const { id } = req.params;
    const categoryDB = await Category.findById( id ); 

    res.json({
        categoryDB
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

    const { id } = req.params;
    const name = req.body.name.toUpperCase();

    const categoryDB = await Category.findOne({ name });

    if ( categoryDB ) {

        return res.status(400).json({
            msg: `La categoria ${ name }, ya existe`
        });

    };
    
    const category = await Category.findByIdAndUpdate( id, { name }, { new: true } );

    res.json({
        msg: 'Categoria actualizada',
        category
    });

};

// Borrar categoria estado falso
const deleteCategory = async(req, res = response) => {

    const { id } = req.params;
    const category = await Category.findByIdAndUpdate( id, { status: false } );

    res.json({
        category,
        userAuth: req.userAuth
    });

};

module.exports = {
    getCategories,
    getCategory,
    postCategory,
    putCategory,
    deleteCategory
};