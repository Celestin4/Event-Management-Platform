const Booking = require('../models/bookingModel');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.getUserBookings = async (req, res, next) => {
  try {
    const userId = req.userData.userId;
    // Retrieve bookings for the user and populate the associated event fields
    const bookings = await Booking.find({ userId }).populate({
      path: 'eventId',
      select: 'title date location ticketAvailability imageUrl description'
    });
    res.status(200).json(bookings);
  } catch (err) {
    console.error("Error fetching user bookings:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.createBooking = async (req, res, next) => {
  try {
    const { tickets } = req.body;
    const { eventId } = req.params;

    if (!eventId || !tickets) {
      return res.status(400).json({ error: "Event ID and tickets are required" });
    }

    const booking = await Booking.create({
      eventId,
      userId: req.userData.userId,
      tickets
    });

    res.status(201).json(booking);
  } catch (err) {
    console.error("Error creating booking:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (err) {
    console.error("Error deleting booking:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getEventBookings = async (req, res, next) => {
  try {
    if (!req.userData || req.userData.userRole !== 'admin') {
      return res.status(403).json({ error: "Only admins can access this resource" });
    }
    const { eventId } = req.params;
    const bookings = await Booking.find({ eventId });
    const userIds = bookings.map(booking => booking.userId);
    const users = await User.find({ _id: { $in: userIds } });
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching event bookings:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
