const { Album, validate } = require('../models/Album');
const { Song } = require('../models/Song');
const { Artist } = require('../models/Artist');
const joi = require('joi');

exports.createAlbum = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const artist = await Artist.findById(req.artist._id);
    const album = await Album({ ...req.body, artist: artist._id }).save();
    artist.albums.push(album._id);
    await artist.save();

    res.status(201).send({ data: album, message: 'Album created successfully!' });
}

exports.getAlbum = async (req, res) => {
    const album = await Song.find();
    res.status(200).send({ data: album });
}

exports.getAlbumById = async (req, res) => {
  const { albumId } = req.params;

  const query = {};

  if (albumId) {
    query._id = albumId;
  }

  const album = await Album.find(query);
  res.status(200).send({ data: album });
};

exports.getOtherAlbumByArtistId = async (req, res) => {
  const { artistId } = req.params;
  const { exceptAlbumId } = req.query;

  const query = {
    artistId,
    _id: { $ne: exceptAlbumId } 
  };

  const albums = await Album.find(query);
  res.status(200).send({ data: albums });
};


exports.getAlbumsByArtistId = async (req, res) => {
  const { artistId } = req.params;

  const query = {};

  if (artistId) {
    query.artistId = artistId;
  }

  const albums = await Album.find(query);
  res.status(200).send({ data: albums });
};

exports.deleteAlbumById = async (req, res) => {
    await Album.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: 'Album deleted successfully!' });
}

exports.editAlbumById = async (req, res) => {
    const schema = joi.object({
        name: joi.string().required(),
        desc: joi.string().allow(""),
        img: joi.string().allow(""),
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const album = await Album.findById(req.params.id);
    if (!album) return res.status(404).send({ message: 'Album with given ID not found!' });

    album.name = req.body.name;
    album.description = req.body.description;
    album.img = req.body.img;
    await album.save();

    res.status(200).send({ data: album, message: 'Album updated successfully!' });
}

exports.addSongToAlbum = async (req, res) => {
    const schema = joi.object({
        albumId: joi.string().required(),
        songId: joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    if(album.songs.indexOf(req.body.songId) === -1) {
        album.songs.push(req.body.songId);
    };
    await album.save();
    res.status(200).send({ data: album, message: 'Song added to album successfully!' });
}

exports.removeSongFromAlbum = async (req, res) => {
    const schema = joi.object({
        albumId: joi.string().required(),
        songId: joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const index = album.songs.indexOf(req.body.songId);
	album.songs.splice(index, 1);
	await album.save();
	res.status(200).send({ data: album, message: "Song removed from album" });
}