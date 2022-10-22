const { response } = require('express');
const { Product } = require('../models');

const getProducts = async(req, res = response) => {

    const { limit = 5, from = 0 } = req.query;
    const query = { status: true };

    const [ total, product ] = await Promise.all([
        Product.countDocuments( query ),
        Product.find( query )
            .populate( 'user', 'name img' )
            .populate( 'category', 'name' )
            .skip( Number(from) )
            .limit( Number(limit) )
    ]);

    res.json({
        total,
        product
    });

};

const getProduct = async(req, res = response) => {

    const { id } = req.params;
    const productDB = await Product.findById( id )
        .populate( 'user', 'name img' ) 
        .populate( 'category', 'name' ); 

    res.json({
        productDB
    });

};

const postProduct = async(req, res = response) => {

    const data = {
        name: req.body.name.toUpperCase(),
        user: req.userAuth._id,
        category: req.body.category
    };

    const product = new Product( data );
    await product.save();

    res.status(201).json({
        product
    });

};

const putProduct = async(req, res = response) => {

    const { id } = req.params;
    const { status, user, ...data } = req.body;

    data.name = data.name.toUpperCase();
    data.userAuth = req.userAuth._id;

    const product = await Product.findByIdAndUpdate( id, data, { new: true } );

    res.json({
        msg: 'Categoria actualizada',
        product
    });

};

const deleteProduct = async(req, res = response) => {

    const { id } = req.params;
    const product = await Product.findByIdAndUpdate( id, { status: false }, { new: true } );

    res.json({
        product
    });

};

module.exports = {
    getProducts,
    getProduct,
    postProduct,
    putProduct,
    deleteProduct
};