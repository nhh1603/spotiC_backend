const mongoose = require('mongoose');
const joi = require('joi');

const ObjectId = mongoose.Schema.Types.ObjectId;

const albumSchema = new mongoose.Schema({
    cover: { type: String, required: true },
    name: { type: String, required: true },
    year: { type: String, required: true },
    artistId: { type: String, required: true },
    artistName: { type: String, required: true },
    totalSongs: { type: String, required: true },
});

const validate = () => {
    const schema = joi.object({
        cover: joi.string().required(),
        name: joi.string().required(),
        year: joi.string().required(),
        artistId: joi.string().required(),
        artistName: joi.string().required(),
        totalSongs: joi.string().required(),
    });
    return schema.validate(playlist);
}

const Album = mongoose.model('Album', albumSchema);

module.exports = { Album, validate };




