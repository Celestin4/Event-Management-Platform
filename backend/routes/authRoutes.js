const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');
const { getUserBookings } = require('../controllers/bookingController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/users', isAuthenticated, isAdmin, authController.getAllUsers)
router.get('/booking', isAuthenticated, getUserBookings)

module.exports = router;
