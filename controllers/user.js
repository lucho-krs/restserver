const { response } = require('express');

const User = require('../models/user');

const getUser = (req, res = response) => {
    const query = req.query;

    res.json({
        msg: 'get controllers',
        query
    });
}

const postUser = async(req, res = response) => {
    const body = req.body;
    const user = new User(body);

    await user.save();

    res.json({
        msg: 'post controllers',
        user
    });
}

const putUser = (req, res = response) => {
    const id = req.params.id;

    res.json({
        msg: 'put controllers',
        id
    });
}

const deleteUser = (req, res = response) => {
    const id = req.params.id;
    
    res.json({
        msg: 'delete controllers'
    });
}

module.exports = {
    getUser,
    putUser,
    postUser,
    deleteUser
}