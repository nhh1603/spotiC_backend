const { Song } = require('../models/Song');
const { Artist } = require('../models/Artist');

exports.getArtists = async (req, res) => {
    const artists = await Artist.find();
    res.status(200).send({ data: artists });
}

exports.getArtistById = async (req, res) => {
    const artist = await Artist.findById(req.params.id);
    res.status(200).send({ data: artist });
}