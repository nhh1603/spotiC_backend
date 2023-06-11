const mongoose = require('mongoose');
const joi = require('joi');

const songSchema = new mongoose.Schema({
    name: { type: String, required: true },
    artistId: { type: String, required: true },
    // artistIds: { type: [String], default: [], required: true },
    artistName: { type: String, required: true }, // need delete
    albumId: { type: String, required: true },
    song: { type: String, required: true },
    cover: { type: String, required: true },
    duration: { type: Number, required: true}, // need delete
    listenTimes: { type: Number, default: 0 },
});

const validate = (song) => {
    const schema = joi.object({
        name: joi.string().required(),
        artistId: joi.string().required(),
        // artist: joi.string().required(),
        artists: joi.array().items(joi.string()).required(),
        album: joi.string().required(),
        song: joi.string().required(),
        cover: joi.string().required(),
    });
    return schema.validate(song);
}

const Song = mongoose.model('Song', songSchema);
module.exports = {Song, validate};