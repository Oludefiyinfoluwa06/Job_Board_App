const jwt = require('jsonwebtoken');
const JobSeeker = require("../models/jobSeeker");

const protectRoute = async (req, res, next) => {
    let token;

    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.jobSeeker = await JobSeeker.findById(decoded.id).select('-password');
            next();
        }
    } catch (error) {
        return res.status(401).json({ 'error': 'User is not authorized, try to login again' });
    }

    if (!token) {
        return res.status(401).json({ 'error': 'User is not authorized, no token, try to login again' });
    }
}

module.exports = {
    protectRoute,
}