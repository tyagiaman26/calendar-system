const express = require('express');
const validator = require('express-validator');

const appointmentController = require('../controller/appointment');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.post('/create/appointment', isAuth,
[
    validator.body('appointmentName').trim().not().isEmpty().withMessage('Appintment can not be blank'),
    validator.body('appointmentDate').trim().not().isEmpty().withMessage('Appintment Date can not be blank'),
], appointmentController.createAppointment);

router.get('/appointment', isAuth,
[
    validator.body('appointmentDate').trim().not().isEmpty().withMessage('Appintment Date can not be blank'),
], appointmentController.getAppointment);

router.post('/update/appointment', isAuth,
[
    validator.body('appointmentName').trim().not().isEmpty().withMessage('Appintment can not be blank'),
    validator.body('appointmentDate').trim().not().isEmpty().withMessage('Appintment Date can not be blank'),
], appointmentController.updateAppointment);

module.exports = router;