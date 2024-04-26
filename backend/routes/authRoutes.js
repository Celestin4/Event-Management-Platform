const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { isAuthenticated } = require('../middleware/authMiddleware');
const { getUserBookings } = require('../controllers/bookingController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/booking', isAuthenticated, getUserBookings)

module.exports = router;
