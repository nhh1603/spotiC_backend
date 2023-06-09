const mongoose = require('mongoose');
const joi = require('joi');

const songSchema = new mongoose.Schema({
    name: { type: String, required: true },
    artist: { type: String, required: true },
    song: { type: String, required: true },
    cover: { type: String, required: true },
    duration: { type: String, required: true },
});

const validate = (song) => {
    const schema = joi.object({
        name: joi.string().required(),
        artist: joi.string().required(),
        song: joi.string().required(),
        cover: joi.string().required(),
        duration: joi.string().required(),
    });
    return schema.validate(song);
}

const Song = mongoose.model('Song', songSchema);
module.exports = {Song, validate};