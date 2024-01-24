const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const jobSeekerSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const JobSeeker = mongoose.model('JobSeeker', jobSeekerSchema);

module.exports = JobSeeker;