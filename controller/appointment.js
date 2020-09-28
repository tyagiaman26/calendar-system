const Appointment = require('../model/appointment');
const validationResult = require('express-validator');

exports.createAppointment = (req, res, next) => {

    const appointmentName = req.body.appointmentName;
    const description = req.body.description;
    const appointmentDate = req.body.appointmentDate;
    const userId = req.userId;
    
    const errors = validationResult.validationResult(req);
    if(!errors.isEmpty()){
       const error = new Error("validation failed!");
       error.statusCode = 422;
       error.data = errors.array();
       throw error;
    }
    const newAppointment = new Appointment({
        appointmentName: appointmentName, 
        description: description, 
        appointmentDate: appointmentDate, 
        userId: userId
    });
         
    newAppointment.save()
    .then(result => {
        res.status(200).json({ 
            message: "Appointment added successfully",
            data: {
                appointment: appointmentName, 
                date: appointmentDate
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

exports.getAppointment = (req, res, next) => {
    
    const appointmentDate = req.body.appointmentDate;
    const userId = req.userId;

    const errors = validationResult.validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error("validation failed!");
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
     }

    Appointment.find({appointmentDate: new Date(appointmentDate), userId: userId})
    .then(appointment => {
        res.status(200).json({
            message: "Appointment get successfully",
            data: appointment
        });
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
    
};

exports.updateAppointment = (req, res, next) => {

    const appointmentId = req.body.appointmentId;
    const appointmentName = req.body.appointmentName;
    const description = req.body.description;
    const appointmentDate = req.body.appointmentDate;
    const userId = req.userId;
    
    const errors = validationResult.validationResult(req);
    if(!errors.isEmpty()){
       const error = new Error("validation failed!");
       error.statusCode = 422;
       error.data = errors.array();
       throw error;
    }

    Appointment.findById(appointmentId)
    .then(appointment => {
        appointment.appointmentName = appointmentName;
        appointment.description = description;
        appointment.appointmentDate = appointmentDate;
        appointment.userId = userId;
        return appointment.save();
    })
    .then(result => {
        res.status(200).json({ 
            message: "Appointment updated successfully",
            data: {
                appointmentName: appointmentName,
                description: description, 
                date: appointmentDate
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