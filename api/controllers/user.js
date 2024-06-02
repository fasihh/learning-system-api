const { sequelize, User } = require('../../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ash = require('../utils/asyncHandler');

module.exports.getAllUsers = ash(async (req, res, next) => {
    await sequelize.sync();
    const users = await User.findAll();

    return res.status(200).json({
        message: 'All users retrieved',
        count: users.length,
        users: users.map(user => ({
            id: user.id,
            username: user.username,
            createdAt: user.createdAt
        }))
    });
});

module.exports.userSignIn = ash(async (req, res, next) => {
    await sequelize.sync();
    const authFailed = () => res.status(401).json({ message: 'User auth failed' });

    const user = await User.findOne({ where: { username: req.body.username }});
    if (!user) return authFailed();

    const status = await bcrypt.compare(req.body.password, user.password);
    if (!status) return authFailed();

    const token = jwt.sign(
        {
            username: user.username,
            userId: user.id
        },
        process.env.JWT_KEY,
        {
            expiresIn: '1h'
        }
    );

    return res.status(200).json({
        message: 'User signed in successfully',
        token: `Bearer ${token}`
    });
});

module.exports.userSignUp = ash(async (req, res, next) => {
    await sequelize.sync();

    const user = await User.findOne({ where: { username: req.body.username }});
    if (user) return res.status(409).json({ message: 'User with this username already exists!'});

    await User.create({
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, 10),
    });
    
    return res.status(201).json({ message: 'User created successfully' });
});