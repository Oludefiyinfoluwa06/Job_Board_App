const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const jobSeekerRoute = require('./routes/jobSeekerRoute');

const port = 5000;
const app = express();

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(res => console.log('Database connected'))
    .catch(err => console.log(err));

app.use(cors());
app.use(express.json());

app.use('/api/jobseeker', jobSeekerRoute);

app.get('/', (req, res) => res.send('Hello world'));

app.listen(port, () => console.log('Server running on port: http://localhost:' + port));