const mongoose = require('mongoose');
const joi = require('joi');

const artistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    cover: { type: String, required: true },
    background: { type: String, required: true },
    genre: { type: String, required: true },
});

const validate = (song) => {
    const schema = joi.object({
        name: joi.string().required(),
        cover: joi.string().required(),
        background: joi.string().required(),
        genre: joi.string().required(),
    });
    return schema.validate(song);
}

const Artist = mongoose.model('Artist', artistSchema);
module.exports = {Artist, validate};