const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');
const { getUserBookings, viewEventAttendees} = require('../controllers/bookingController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/users', isAuthenticated, isAdmin, authController.getAllUsers)
router.get('/viewAttebdee/:eventId', isAuthenticated, isAdmin, viewEventAttendees)
router.get('/booking', isAuthenticated, getUserBookings)
router

module.exports = router;
