const { Artist, validate } = require('../models/Artist');
const { Song } = require('../models/Song');
const { Album } = require('../models/Album');
const joi = require('joi');

exports.createArtist = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const artist = await Artist(req.body).save();
    res.status(201).send({ data: artist, message: 'Artist created successfully!' });
}

exports.getArtists = async (req, res) => {
    const artists = await Artist.find();
    res.status(200).send({ data: artists });
}

exports.getArtistById = async (req, res) => {
  const { artistId } = req.params;

  const query = {};

  if (artistId) {
    query._id = artistId;
  }

  const artist = await Artist.find(query);
  res.status(200).send({ data: artist });
};

exports.deleteArtistById = async (req, res) => {
    await Artist.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: 'Artist deleted successfully!' });
}

exports.editArtistById = async (req, res) => {
    const schema = joi.object({
        name: joi.string().required(),
        genre: joi.string().allow(""),
        img: joi.string().allow(""),
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const artist = await Artist.findById(req.params.id);
    if (!artist) return res.status(404).send({ message: 'Artist with given ID not found!' });

    artist.name = req.body.name;
    artist.genre = req.body.genre;
    artist.img = req.body.img;
    
    await artist.save();

    res.status(200).send({ data: artist, message: 'Artist updated successfully!' });
}


exports.addSongToArtist = async (req, res) => {
    const schema = joi.object({
        artistId: joi.string().required(),
        songId: joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    if(artist.songs.indexOf(req.body.songId) === -1) {
        artist.songs.push(req.body.songId);
    };
    await artist.save();
    res.status(200).send({ data: artist, message: 'Song added to artist successfully!' });
}

exports.removeSongFromArtist = async (req, res) => {
    const schema = joi.object({
        partistId: joi.string().required(),
        songId: joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const index = artist.songs.indexOf(req.body.songId);
    artist.songs.splice(index, 1);
    await artist.save();
    res.status(200).send({ data: artist, message: "Song removed from artist" });
}

exports.addAlbumToArtist = async (req, res) => {
    const schema = joi.object({
        artistId: joi.string().required(),
        albumId: joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    if(artist.albums.indexOf(req.body.albumId) === -1) {
        artist.albums.push(req.body.albumId);
    };
    await artist.save();
    res.status(200).send({ data: artist, message: 'Album added to artist successfully!' });
}

exports.removeAlbumFromArtist = async (req, res) => {
    const schema = joi.object({
        partistId: joi.string().required(),
        albumId: joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const index = artist.albums.indexOf(req.body.albumId);
    artist.albums.splice(index, 1);
    await artist.save();
    res.status(200).send({ data: artist, message: "Album removed from artist" });
}

