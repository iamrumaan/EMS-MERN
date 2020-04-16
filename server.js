//Import npm Packages
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

const routes = require('./routes/api');
const Employee = require('./models/employee');

const MONGODB_URI = 'mongodb+srv://iamrumaan:democluster@merncluster-mx16n.azure.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!');
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));

//HTTP request logger
app.use(morgan('tiny'));
app.use('/api', routes);
//Mongo DB : iamrumaan ; democluster

app.listen(PORT,console.log(`Server started at : ${PORT}`));