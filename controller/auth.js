const User = require('../model/user');
const validationResult = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.postSignup = (req, res, next) => {

    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    const errors = validationResult.validationResult(req);
    if(!errors.isEmpty()){
       const error = new Error("validation failed!");
       error.statusCode = 422;
       error.data = errors.array();
       throw error;
    }
    User.findOne({email: email})
    .then(user => {
        if(user){
            const errors = new Error("Email already exists");
            errors.statusCode = 422;
            throw errors;
        }
        if(password !== confirmPassword){
            const errors = new Error("Password does not match.");
            errors.statusCode = 422;
            throw errors;
        }
        return bcrypt.hash(password, 12);
        
    })
    .then(hashedPasswrd => {
        const newUser = new User({name: name, email: email, password: hashedPasswrd});

        return newUser.save();
       
    })
    .then(result => {
        res.status(200).json({ 
            message: "Signup successfully",
            data: {
                name: name,
                email: email
            }
        });
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
    
};

exports.postLogin = (req, res, next) => {
const email = req.body.email;
const password = req.body.password;
let loadedUser;

const errors = validationResult.validationResult(req);
if(!errors.isEmpty()){
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
}

User.findOne({email: email})
.then(user => {
    if(!user){
        const error = new Error('Email does not exists.');
        error.statusCode = 401;
        throw error;
    }
    loadedUser = user;
    return bcrypt.compare(password, user.password);
    
})
.then(isEqual => { 
    if(!isEqual){
        const error = new Error('Password is wrong.');
        error.statusCode = 401;
        throw error;
    }

    const token = jwt.sign(
        {
            email: loadedUser.email, userId: loadedUser._id.toString()
        },
        'supersecretkey', {expiresIn: '1hr'});
    res.status(200).json({
        message: 'Login successfull.',
        data: {
            token : token,
            userId: loadedUser._id.toString(),
            name: loadedUser.name
        }
    })
})
.catch(err => {
    if(!err.statusCode){
        err.statusCode = 500;
    }
    next(err);
});

};