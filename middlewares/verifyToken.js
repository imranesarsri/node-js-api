const jwt = require('jsonwebtoken');
const { User } = require('../Models/User');

function verifyToken(req, res, next) {
    const token = req.headers.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = decoded;
            // console.log(req.user)
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    } else {
        return res.status(401).json({ message: 'Authorization token not provided' });
    }
}


// verify Token & Authorization the User
function verifyTokenAndAuthorization(req, res, next) {
    verifyToken(req, res, async () => {
        const ID = req.params.id

        if (req.user.id === ID || req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json({ message: 'You are not allowed to update this profile' });
        }
    });
}


// verify Token & Admin
function verifyTokenAndAdmin(req, res, next) {

    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next()
        } else {
            return res.status(403).json({ message: 'You are not allowed, only admin' });
        }
    })
}

module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
};
