const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const authRoutes = require('./routes/auth');
const appointment = require('./routes/appointment');

const MONGODB_URI = 'mongodb+srv://aman_tyagi:aman@12345@cluster0-ohwrm.mongodb.net/calendar?retryWrites=true&w=majority';

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(authRoutes);
app.use(appointment);

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

mongoose.connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true, })
.then(res => {
    console.log('connection created');
    app.listen(8080);
})
.catch(err => {
    console.log(err);
});

