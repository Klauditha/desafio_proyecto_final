const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes/index');

//middleware
app.use(cors());
app.use(express.json());


//routes
app.use('/api', routes);


module.exports = app;
