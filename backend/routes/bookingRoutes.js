const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');

router.post('/:eventId', isAuthenticated, bookingController.createBooking);
router.delete('/:id', isAuthenticated, bookingController.cancelBooking);
router.get('/users/:eventId', isAuthenticated, isAdmin, bookingController.getEventBookings);

module.exports = router;
