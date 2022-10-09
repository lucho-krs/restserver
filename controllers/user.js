const { response } = require

const getUser = (req, res = response) => {
    res.json({
        msg: 'get controllers'
    });
}

const putUser = (req, res = response) => {
    res.json({
        msg: 'put controllers'
    });
}

const postUser = (req, res = response) => {
    res.json({
        msg: 'post controllers'
    });
}

const deleteUser = (req, res = response) => {
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