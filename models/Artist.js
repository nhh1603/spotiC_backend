const mongoose = require('mongoose');
const joi = require('joi');


const artistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    genre: { type: String },
    songs: { type: Array, default: [] },
    albums: { type: Array, default: [] },
    img: { type: String },
});

const validate = () => {
    const schema = joi.object({
        name: joi.string().required(),
        genre: joi.string().allow(""),
        songs: joi.array().items(joi.string()),
        albums: joi.array().items(joi.string()),
        img: joi.string().allow(""),
    });
    return schema.validate(playlist);
}

const Artist = mongoose.model('Artist', artistSchema);

module.exports = { Artist, validate };