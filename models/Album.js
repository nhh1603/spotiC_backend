const mongoose = require('mongoose');
const joi = require('joi');

const ObjectId = mongoose.Schema.Types.ObjectId;

const albumSchema = new mongoose.Schema({
    name: { type: String, required: true },
    artist: { type: ObjectId, ref: "artist", required: true },
    desc: { type: String },
    songs: { type: Array, default: [] },
    img: { type: String },
});

const validate = () => {
    const schema = joi.object({
        name: joi.string().required(),
        artist: joi.string().required(),
        desc: joi.string().allow(""),
        songs: joi.array().items(joi.string()),
        img: joi.string().allow(""),
    });
    return schema.validate(playlist);
}

const Album = mongoose.model('Album', albumSchema);

module.exports = { Album, validate };