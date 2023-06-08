const express = require('express');
const router = express.Router();

// import controllers
const { getTest } = require('../controllers/test');
const { signupUser, getUsers, loginUser, getUserById, updateUserById, deleteUserById }= require('../controllers/user');
const { createSong, getSongs, updateSongById, deleteSongById, likeSong, getLikedSongs } = require('../controllers/song');
const { createPlaylist, editPlaylistById, addSongToPlaylist, removeSongFromPlaylist } = require('../controllers/playlist');
const { createArtist, getArtists, deleteArtistById, editArtistById, addSongToArtist, removeSongFromArtist, addAlbumToArtist, removeAlbumFromArtist}= require('../controllers/artist');
const { createAlbum, getAlbum, deleteAlbumById, editAlbumById, addSongToAlbum, removeSongFromAlbum} = require('../controllers/album');

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

//artist routes
router.post('/artist', auth, createArtist);
router.get('/artist', getArtists);
router.delete('/artist/:id', [validObjectId, admin], deleteArtistById);
router.put('/artist/:id', [validObjectId, admin], editArtistById);
router.put('/artist/addsong', [validObjectId, admin], addSongToArtist);
router.put('/artist/removesong', [validObjectId, admin], removeSongFromArtist);
router.put('/artist/addalbum', [validObjectId, admin], addAlbumToArtist);
router.put('/artist/removealbum', [validObjectId, admin], removeAlbumFromArtist);

//album routes
router.post('/album', auth, createAlbum);
router.get('/album', getAlbum);
router.delete('/album/:id', [validObjectId, admin], deleteAlbumById);
router.put('/album/:id', [validObjectId, admin], editAlbumById);
router.put('/album/addsong', [validObjectId, admin], addSongToAlbum);
router.put('/album/removesong', [validObjectId, admin], removeSongFromAlbum);


module.exports = router;
