const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  ticketAvailability: { type: Number, required: true },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
