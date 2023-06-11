const mongoose = require('mongoose');
const joi = require('joi');

const songSchema = new mongoose.Schema({
    name: { type: String, required: true },
    artistId: { type: String, required: true },
    albumId: { type: String, required: true },
    song: { type: String, required: true },
    cover: { type: String, required: true },
    duration: { type: String, required: true },
    artistName: { type: String, required: true },
    listenTimes: { type: Number, default:0 },
    artistId: { type: String, required:true},
});

const validate = (song) => {
    const schema = joi.object({
        name: joi.string().required(),
        artistId: joi.string().required(),
        artistName: joi.string().required(),
        albumId: joi.string().required(),
        song: joi.string().required(),
        cover: joi.string().required(),
        listenTimes: joi.string().required(),
        artistId: joi.string().required(),
    });
    return schema.validate(song);
}

const Song = mongoose.model('Song', songSchema);
module.exports = {Song, validate};