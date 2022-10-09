const { response } = require

const getUser = (req, res = response) => {
    const query = req.query;

    res.json({
        msg: 'get controllers',
        query
    });
}

const putUser = (req, res = response) => {
    const id = req.params.id;

    res.json({
        msg: 'put controllers',
        id
    });
}

const postUser = (req, res = response) => {
    const body = req.body;

    res.json({
        msg: 'post controllers',
        body
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