const user = require('../models/usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const signup = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        if (!email || !password || !username) {
            return res.status(400).json({
                message: "Please Enter Email Password and Username"
            })
        }
        const existinguser = await user.findOne({ email });
        if (existinguser) {
            return res.status(400).json({
                message: "User Already Exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const data = new user({
            email: email,
            password: hashedPassword,
            username: username
        });
        const response = await data.save();
        return res.status(201).json({
            message: "User Created",
            response: response
        })
    }
    catch (ex) {
        return res.status(500).json({
            message: "internal server error"
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Enter Email and Password"
            })
        }
        const existinguser = await user.findOne({ email });
        if (!existinguser) {
            return res.status(404).json({
                message: "User Not Found"
            })
        }
        const checkPassword = await bcrypt.compare(password, existinguser.password);
        if (!checkPassword) {
            return res.status(401).json({
                message: "Password Incorrect"
            })
        }
        const token = jwt.sign({
            id: existinguser._id
        }, process.env.SECRETKEY, { expiresIn: '90d' });

        return res.status(200).json({
            message: "Login Success",
            response: existinguser,
            token: token
        })
    }
    catch (ex) {
        return res.status(500).json({
            message: "internal server error"
        })
    }
}

module.exports = { signup, login };