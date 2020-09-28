const express = require('express');
const validator = require('express-validator');
const authController = require('../controller/auth');

const router = express.Router();

router.post('/signup', 
[
    validator.body('name').trim().isLength({min: 4}).withMessage('Passowd should be greater than 4 ch'),
    validator.body('email').trim().isEmail().withMessage('Invalid email.'),
    validator.body('email').trim().not().isEmpty().withMessage('Email can not be blank')
], 
authController.postSignup);

router.post('/login', [
    validator.body('email').trim().not().isEmpty().withMessage('Email can not be empty'),
    validator.body('password').trim().not().isEmpty().withMessage('Password can not be empty')
], authController.postLogin);

module.exports = router;