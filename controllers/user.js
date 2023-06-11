const { User, validate } = require('../models/User');
const bcrypt = require('bcrypt');

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
        })
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password -__v');
        
        res.status(200).json({ data: users });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

exports.getUserById = async (req, res) => {
    const user = await User.findById(req.params.id).select('-password -__v');
    res.status(200).json({ data: user });
}

exports.updateUserById = async (req, res) => {
    const user = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
    ).select('-password -__v');
    res.status(200).json({ data: user });
}

exports.deleteUserById = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'User deleted successfully!' });
}

exports.signupUser = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (user) return res.status(403).send({ message: 'User with given email already exist!' });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    let newUser = await new User({
        ...req.body,
        password: hashedPassword,
    }).save();
        
    newUser.password = undefined;
    newUser.__v = undefined;

    res.status(200).send({ data: newUser, message: 'User created successfully!' });
}

exports.loginUser = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send({ message: 'Invalid email or password!' });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send({ message: 'Invalid email or password!' });

    const token = user.generateAuthToken();
    res.status(200).send({ data: token, message: 'Login successful!' });
}
