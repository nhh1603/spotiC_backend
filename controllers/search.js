const { Song } = require("../models/Song");
const { Playlist } = require("../models/Playlist");
const { Artist } = require("../models/Artist");
const { Album } = require("../models/Album");

exports.getSearch = async (req, res) => {
    const search = req.query.search;
    if (search !== "") {
        const songs = await Song.find({
            name: { $regex: search, $options: "i" },
        }).limit(10);
        const playlists = await Playlist.find({
            name: { $regex: search, $options: "i" },
        }).limit(10);
        const artists = await Artist.find({
            name: { $regex: search, $options: "i" },
        }).limit(10);
        const albums = await Album.find({
            name: { $regex: search, $options: "i" },
        }).limit(10);

        const result = { songs, playlists, artists, albums };
        res.status(200).json({ data: result });
    } else {
        res.status(200).json({ data: [] });
    }
};