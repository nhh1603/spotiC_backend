const User = require('../models/User');
const { ObjectId } = require('mongodb');
const { MongoClient } = require('mongodb');

exports.submitSignUp = async (req, res) => {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    user.save()
        .then(() => {
            res.status(201).json({
                message: 'User created successfully!'
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: error
            });
            console.log("1");
        })
};

// module.exports = {
//     submitSignUp,
// };