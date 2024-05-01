const User = require('../models/user.model.js');
const bcryptjs = require('bcryptjs');
const errorHandler = require('../utils/error.js');

const signUp = async (req, res, next) => {

    const { username, email, password } = req.body;

    if (!username || !email || !password || username === '' || email === '' || password === '') {
     next(errorHandler(400, "All fields are required!"))
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);


    const newUser = new User({
        username: username,
        email: email,
        password: hashedPassword
    })

    try {
        await newUser.save();

        res.status(200).json('User successfully created!')
    } catch (error) {
        next(error);
    }


}

module.exports = signUp