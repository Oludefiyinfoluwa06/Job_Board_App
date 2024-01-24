const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JobSeeker = require('../models/jobSeeker');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

const register = async (req, res) => {
    const { firstname, lastname, username, email, password } = req.body;

    if (!firstname || !lastname || !username || !email || !password) {
        return res.status(400).json({ 'error': 'Input fields cannot be empty' });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ 'error': 'Invalid email address' });
    }

    if (!validator.isStrongPassword(password)) {
        return res.status(400).json({ 'error': 'Password is not strong enough' });
    }

    const emailExists = await JobSeeker.findOne({ email });

    if (!emailExists) {
        return res.status(400).json({ 'error': 'Email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const jobSeeker = await JobSeeker.create({ firstname, lastname, username, email, password: hash });

    if (!jobSeeker) {
        return res.status(500).json({ 'error': 'An error occured, please try again' });
    }

    return res.status(200).json({ 'message': 'Registration successful' });
}

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ 'error': 'Input fields cannot be empty' });
    }

    const jobSeeker = await JobSeeker.findOne({ email });

    if (!jobSeeker) {
        return res.status(404).json({ 'error': 'Email does not exist' });
    }

    const passwordMatch = await bcrypt.compare(password, jobSeeker.password);

    if (!passwordMatch) {
        return res.status(400).json({ 'error': 'Incorrect password' });
    }

    return res.status(200).json({ 'message': 'Login successful', 'user': jobSeeker, 'token': generateToken(jobSeeker._id) });
}

const userProfile = async (req, res) => {
    const { _id, firstname, lastname, username, email } = await JobSeeker.findById(req.jobSeeker.id);

    return res.status(200).json({ 'jobSeeker': { id: _id, firstname, lastname, username, email } });
}

module.exports = {
    register,
    login,
    userProfile,
}