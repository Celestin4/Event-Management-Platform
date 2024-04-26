const Booking = require('../models/bookingModel');

exports.getUserBookings = async (req, res, next) => {
  try {
    // Assuming userId is obtained from authentication middleware
    const userId = req.userData.userId;

    // Find all bookings associated with the user
    const bookings = await Booking.find({ userId });

    res.status(200).json(bookings);
  } catch (err) {
    console.error("Error fetching user bookings:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};


// Create a new booking
exports.createBooking = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const { tickets } = req.body;
    
    // Additional validation
    if (!eventId || !tickets) {
      return res.status(400).json({ error: "Event ID and number of tickets are required" });
    }

    // Create the booking
    const booking = await Booking.create({
      eventId,
      userId: req.userData.userId, // Assuming userId is obtained from authentication middleware
      tickets
    });
    console.log(booking)
    
    res.status(201).json(booking);
  } catch (err) {
    console.error("Error creating booking:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a booking
exports.deleteBooking = async (req, res, next) => {
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
