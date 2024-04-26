const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { isAuthenticated } = require('../middleware/authMiddleware');

router.post('/:eventId', isAuthenticated, bookingController.createBooking);
router.delete('/:id', isAuthenticated, bookingController.deleteBooking);

module.exports = router;
