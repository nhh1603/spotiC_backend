const { User } = require('../models/User');
const { Song, validate } = require('../models/Song');
// const auth = require('../middlewares/auth');
// const admin = require('../middlewares/admin');
// const validObjectId = require('../middlewares/validObjectId');

exports.createSong = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const song = await Song(req.body).save();
    res.status(201).send({ data: song, message: 'Song created successfully!' });
}

exports.getSongs = async (req, res) => {
    const songs = await Song.find();
    res.status(200).send({ data: songs });
}

exports.getSongById = async (req, res) => {
    const song = await Song.findById(req.params.id);
    res.status(200).send({ data: song });
}

exports.getSongsByArtistId = async (req, res) => {
  const { artistId } = req.params;

  const query = {};

  if (artistId) {
    query.artistId = artistId;
  }

  const songs = await Song.find(query);
  res.status(200).send({ data: songs });
};

exports.getSongsByAlbumId = async (req, res) => {
  const { albumId } = req.params;

  const query = {};

  if (albumId) {
    query.albumId = albumId;
  }

  const songs = await Song.find(query);
  res.status(200).send({ data: songs });
};

exports.getSongsByPlaylistId = async (req, res) => {
    const { playlistId } = req.params;
  
    const query = {};
  
    if (playlistId) {
      query.playlistId = playlistId;
    }
  
    const songs = await Song.find(query);
    res.status(200).send({ data: songs });
  };

exports.updateSongById = async (req, res) => {
    const song = await Song.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.status(200).send({ data: song, message: 'Song updated successfully!' });
}

exports.deleteSongById = async (req, res) => {
    await Song.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: 'Song deleted successfully!' });
}

exports.likeSong = async (req, res) => {
    let resMessage = '';

    const song = await Song.findById(req.params.id);
    if (!song) return res.status(404).send({ message: 'Song with given ID not found!' });

    const user = await User.findById(req.user._id);
    const index = user.likedSongs.indexOf(song._id);
    if (index === -1) {
        user.likedSongs.push(song._id);
        resMessage = 'Added to your liked songs!';
    } else {
        user.likedSongs.splice(index, 1);
        resMessage = 'Removed from your liked songs!';
    }
    res.status(200).send({ message: resMessage });
}

exports.getLikedSongs = async (req, res) => {
    const user = await User.findById(req.user._id);
    const songs = await Song.find({ _id: user.likedSongs });
    res.status(200).send({ data: songs });
}
