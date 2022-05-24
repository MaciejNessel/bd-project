const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Item = require("../models/Item");



const register = async (req, res, next) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: hashedPassword,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })
    user.save().then(response => {
        res.json({
            message: 'User registered successfully',
            status: true
        })
    }).catch(error => {
        res.json({
            message: error.name +": "+ error.message,
            status: false
        })
    })
}

const login = async (req, res, next) => {
    User.findOne({userName: req.body.userName}).then(async response => {
        console.log(response);
        const validPass = await bcrypt.compare(req.body.password, response.password)
        if(validPass){
            const token = jwt.sign({_id: response._id}, process.env.JWT_SECRET, {expiresIn: "60m",});
            res.header('auth-token', token);
            res.json({
                message: "Logged.",
                status: true
            })
        } else{
            res.json({
                message: "Wrong username or password",
                status: false
            })
        }
    }).catch(error =>{
        res.json({
            message: "Wrong username or password.",
            status: false
        })
    })
}

const test = async (req, res, next) => {
    res.json({
        user: req.user,
        status: true,
        message: "Ok"
    });
}

module.exports = {
    register, login, test
}