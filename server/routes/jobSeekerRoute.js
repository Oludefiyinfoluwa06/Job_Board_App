const router = require('express').Router();

const { protectRoute } = require('../middlewares/authMiddleware');
const { register, login, userProfile } = require('../controllers/jobSeekerController');

router.post('/register', register);

router.post('/login', login);

router.get('/profile', protectRoute, userProfile);

module.exports = router;