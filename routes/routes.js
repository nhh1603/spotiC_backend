const express = require('express');
const router = express.Router();

// import controllers
const { getTest } = require('../controllers/test');
const { signupUser, getUsers, loginUser, getUserById, updateUserById, deleteUserById }= require('../controllers/user');

//import middlewares
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const validObjectId = require('../middlewares/validObjectId');

// api routes
router.get('/', getTest);
router.get('/user', admin, getUsers);
router.get('/user:id', [validObjectId, auth], getUserById);
router.put('/user:id', [validObjectId, auth], updateUserById);
router.delete('/user:id', [validObjectId, auth], deleteUserById);
// router.post('/submitSignUp', submitSignUp);
router.post('/submitSignUp', signupUser);
router.post('/login', loginUser);


module.exports = router;