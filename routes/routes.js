const express = require('express');
const router = express.Router();


// import controllers
const { getTest } = require('../controllers/test');
const { submitSignUp }= require('../controllers/submitSignUp');

//import middlewares


// api routes
router.get('/', getTest);
router.post('/submitSignUp', submitSignUp);


module.exports = router;