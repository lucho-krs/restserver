const { response } = require('express');
const { ObjectId } = require('mongoose').Types;

const {
    User,
    Category,
    Product,
} = require('../models');

const collectionsValid = [
    'users',
    'categories',
    'products',
];

const searchUsers = async( term = '', res ) => {

    const isMongoId = ObjectId.isValid( term );
    
    if ( isMongoId ) {
        
        const result = await User.findById( term );
        
        return res.json({
            results: ( result ) ? [ result ] : []
        });

    };

    const regex = new RegExp( term, 'i' );
    const result = await User.find({
        $or: [{ name: regex }],
        $and: [{ status: true }]
    });

    res.json({ 
        results: result
    });

};

const searchProducts = async( term = '', res ) => {

    const isMongoId = ObjectId.isValid( term );
    
    if ( isMongoId ) {
        
        const result = await Product.findById( term )
            .populate('category','name');
        
        return res.json({
            results: ( result ) ? [ result ] : []
        });

    };

    const regex = new RegExp( term, 'i' );
    const result = await Product.find({ name: regex, status: true })
        .populate('category','name');

    res.json({ 
        results: result
    });

};


const searchCategories = async( term = '', res ) => {

    const isMongoId = ObjectId.isValid( term );
    
    if ( isMongoId ) {
        
        const result = await Category.findById( term );
        
        return res.json({
            results: ( result ) ? [ result ] : []
        });

    };

    const regex = new RegExp( term, 'i' );
    const result = await Category.find({ name: regex, status: true });

    res.json({ 
        results: result
    });

};

const search = async( req, res = response ) => {

    const { collection, term } = req.params;
    if ( !collectionsValid.includes( collection ) ) {

        return res.status(400).json({
            msg: `Colección no valida, las colecciones permitidas son: ${ collectionsValid }`
        });
        
    };

    switch ( collection ) {

        case 'categories':
            searchCategories( term, res );
            break;

        case 'users': 
            searchUsers( term, res );
            break;

        case 'products':  
            searchProducts( term, res )
            break;
            
        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta búsquda'
            });
            break;

    }

};

module.exports = {
    search
};