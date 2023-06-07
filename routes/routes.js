const express = require('express');
const router = express.Router();

// import controllers
const { getTest } = require('../controllers/test');
const { signupUser, getUsers, loginUser, getUserById, updateUserById, deleteUserById }= require('../controllers/user');
const { createSong, getSongs, updateSongById, deleteSongById, likeSong, getLikedSongs } = require('../controllers/song');
const { createPlaylist, editPlaylistById, addSongToPlaylist, removeSongFromPlaylist } = require('../controllers/playlist');

//import middlewares
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const validObjectId = require('../middlewares/validObjectId');

// api routes

//user routes
router.get('/', getTest);
router.get('/user', admin, getUsers);
router.get('/user/:id', [validObjectId, auth], getUserById);
router.put('/user/:id', [validObjectId, auth], updateUserById);
router.delete('/user/:id', [validObjectId, admin], deleteUserById);
router.post('/submitSignUp', signupUser);
router.post('/login', loginUser);

//song routes
router.post('/song', admin, createSong);
router.get('/song', getSongs);
router.put('/song/:id', [validObjectId, admin], updateSongById);
router.delete('/song/:id', [validObjectId, admin], deleteSongById);
router.post('/song/like/:id', [validObjectId, auth], likeSong);
router.get('/song/like', auth, getLikedSongs);

//playlist routes
router.post('/playlist', auth, createPlaylist);
router.put('/playlist/:id', [validObjectId, auth], editPlaylistById);
router.put('/playlist/addsong', auth, addSongToPlaylist);
router.put('/playlist/removesong', auth, removeSongFromPlaylist);

module.exports = router;