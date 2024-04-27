const Booking = require('../models/bookingModel');
const User = require('../models/userModel');
const Event = require('../models/eventModel')
const jwt = require('jsonwebtoken');

exports.getUserBookings = async (req, res, next) => {
  try {
    const userId = req.userData.userId;
    // Retrieve bookings for the user and populate the associated event fields
    const bookings = await Booking.find({ userId }).populate({
      path: 'eventId',
      select: 'title date location ticketAvailability imageUrl description'
    });
    
    // Handle the case where eventId does not exist
    const filteredBookings = bookings.map(booking => {
      if (!booking.eventId) {
        // Handle the case where eventId does not exist for this booking
        // You can set a default or customize your handling here
        return {
          ...booking.toObject(),
          event: null // For example, setting event to null
        };
      } else {
        return booking;
      }
    });

    res.status(200).json(filteredBookings);
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

    // Check if the event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
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


exports.viewEventAttendees = async (req, res, next) => {
  try {
    if (!req.userData || req.userData.userRole !== 'admin') {
      return res.status(403).json({ error: "Only admins can access this resource" });
    }

    const { eventId } = req.params;

    // Find all bookings for the event
    const bookings = await Booking.find({ eventId });

    // Extract user IDs from bookings
    const userIds = bookings.map(booking => booking.userId);

    // Find users with the extracted IDs and populate their full names
    const users = await User.find({ _id: { $in: userIds } }).select('fullName');

    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching event attendees:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

