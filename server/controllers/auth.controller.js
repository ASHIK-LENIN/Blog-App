const User = require('../models/user.model.js');
const bcryptjs = require('bcryptjs');
const errorHandler = require('../utils/error.js');
const jwt = require('jsonwebtoken')

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

const signIn = async (req, res, next) => {

    const { email, password } = req.body;

    if (!email || !password || email === '' || password === '') {
        next(errorHandler(400, 'All fields are required!'))
    }

    try {
        const validUser = await User.findOne({ email })
        if (!validUser) {
            next(errorHandler(404, 'User not found'))
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if (!validPassword) {
           return next(errorHandler(404, 'Incorrect Password!'))
        }

        const token = jwt.sign({ id : validUser._id}, process.env.JWT_SECRET_KEY);

        const { password: pass, ...rest } = validUser._doc;
        res
        .status(200)
        .cookie('access_token', token,{
            httpOnly : true,
        })
        .json(rest)
    } catch (error) {
        next(error);
    }


}


module.exports = {
    signUp,
    signIn

} 