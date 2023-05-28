// import modules
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

// app
const app = express();

// db
mongoose
    .connect(process.env.ATLAS_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('DB connected'))
    .catch((err) => console.log('DB connection error: ', err));

// middlewares
app.use(morgan('dev'));
app.use(cors({
    origin: true,
    credentials: true
}));

// routes
const testRoutes = require('./routes/test');
app.use("/", testRoutes)

// port
const port = process.env.PORT || 8000;

// listener
const server = app.listen(port, () =>
    console.log(`Server running on port ${port}`)
);