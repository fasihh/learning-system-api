const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = (req, res, next) => {
    try {
        const userData = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_KEY);
        req.userData = userData;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'User auth failed' });
    }
};