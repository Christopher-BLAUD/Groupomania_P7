const express = require('express');
const app = express();


app.use((req, res, next) => {
    console.log('Request successfull !');
    next();
});

app.use((req, res, next) => {
    res.status(201).json({message : 'Request has been successfull !'})
    next();
});

app.use((req, res, next) => {
    console.log('Response has been successfull !')
});


module.exports = app;