const { sequelize, User } = require('../../db');

module.exports.getAllUsers = (req, res, next) => {
    sequelize.sync()
    .then(async () => {
        try {
            const users = await User.findAll();
            console.log(users);
            return res.status(200).json({
                message: 'All users retrieved',
                count: users.length,
                users: users.map()
            });
        } catch(error) {
            console.error(error);
            return res.status(400).json({ message: 'Could not get all users', error: error });
        }
    })
    .catch(error => res.status(500).json({ message: 'An error has occured', error: error }));
}

module.exports.userSignIn = (req, res, next) => {
    return res.status(200).json({
        message: 'User signin successful'
    })
}

module.exports.userSignUp = (req, res, next) => {
    sequelize.sync()
    .then(async () => {
        try {
            await User.create({
                username: req.body.username,
                password: req.body.password,
            });
            return res.status(201).json({ message: 'User created successfully' });
        } catch(error) {
            console.error(error);
            return res.status(400).json({ message: 'User could not be created', error: error });
        }
    })
    .catch(error => res.status(500).json({ message: 'An error has occured', error: error }));
}