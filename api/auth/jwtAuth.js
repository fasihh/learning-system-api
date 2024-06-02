const jwt = require('jsonwebtoken');
const ash = require('../utils/asyncHandler');
const dotenv = require('dotenv');
dotenv.config();

module.exports = ash((req, res, next) => {
    const userData = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_KEY);
    req.userData = userData;
    next();
});