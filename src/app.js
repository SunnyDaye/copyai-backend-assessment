require("dotenv").config();
const express = require('express');
const app = express();

//Route Imports
const apiRouter = require('./api/api.router');

//Formats bodies of rquests
app.use(express.json());

app.use('/api',apiRouter); //Handles api routes

app.use((req, res, next) => { //Handles unwanted routes
    next({ status: 404, message: `Not found: ${req.originalUrl}` });
});

app.use((error, req, res, next) => {  // ! Handles all errors
    console.error(error);
    const { status = 500, message = "Something went wrong!" } = error;
    res.status(status).json({ error: message });
  });
module.exports = app;