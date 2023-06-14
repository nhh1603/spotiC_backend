const { Playlist, validate } = require('../models/Playlist');
const { Song } = require('../models/Song');
const { User } = require('../models/User');
const joi = require('joi');

exports.createPlaylist = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const user = await User.findById(req.user._id);
    const playlist = await Playlist({ ...req.body, user: user._id }).save();
    user.playlists.push(playlist._id);
    await user.save();

    res.status(201).send({ data: playlist, message: 'Playlist created successfully!' });
}

exports.getPlaylists = async (req, res) => {
    const playlists = await Playlist.find();
    res.status(200).send({ data: playlists });
}

exports.editPlaylistById = async (req, res) => {
    const schema = joi.object({
        name: joi.string().required(),
        description: joi.string().allow(""),
        img: joi.string().allow(""),
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) return res.status(404).send({ message: 'Playlist with given ID not found!' });

    const user = await User.findById(req.user._id);
    if(!user._id.equals(playlist.user)) return res.status(403).send({ message: 'You are not authorized to edit this playlist!' });

    playlist.name = req.body.name;
    playlist.description = req.body.description;
    playlist.img = req.body.img;
    await playlist.save();

    res.status(200).send({ data: playlist, message: 'Playlist updated successfully!' });
}

exports.addSongToPlaylist = async (req, res) => {
    const schema = joi.object({
        playlistId: joi.string().required(),
        songId: joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const user = await User.findById(req.user._id);
    const playlist = await Playlist.findById(req.body.playlistId);
    if(!user._id.equals(playlist.user)) return res.status(403).send({ message: 'You are not authorized to add to this playlist!' });

    if(playlist.songs.indexOf(req.body.songId) === -1) {
        playlist.songs.push(req.body.songId);
    };
    await playlist.save();
    res.status(200).send({ data: playlist, message: 'Song added to playlist successfully!' });
}

exports.removeSongFromPlaylist = async (req, res) => {
    const schema = joi.object({
        playlistId: joi.string().required(),
        songId: joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const user = await User.findById(req.user._id);
    const playlist = await Playlist.findById(req.body.playlistId);
    if(!user._id.equals(playlist.user)) return res.status(403).send({ message: 'You are not authorized to remove!' });

    const index = playlist.songs.indexOf(req.body.songId);
	playlist.songs.splice(index, 1);
	await playlist.save();
	res.status(200).send({ data: playlist, message: "Removed from playlist" });
}