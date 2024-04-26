const Event = require('../models/eventModel');

exports.getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    next(err);
  }
};

exports.getUpcomingEvents = async (req, res, next) => {
  try {
    const currentDate = new Date();
    const upcomingEvents = await Event.find({ date: { $gte: currentDate } }).sort({ date: 1 });
    res.json(upcomingEvents);
  } catch (err) {
    next(err);
  }
};

exports.getMostRecentEvents = async (req, res, next) => {
  try {
    const currentDate = new Date();
    const sevenDaysLater = new Date(currentDate);
    sevenDaysLater.setDate(currentDate.getDate() + 7);

    const recentEvents = await Event.find({ date: { $gte: currentDate, $lte: sevenDaysLater } }).sort({ date: 1 });
    res.json(recentEvents);
  } catch (err) {
    next(err);
  }
};

exports.getEventById = async (req, res, next) => {
  try {
    const eventId = req.params.id;

    if (eventId === "upcoming") {
      return exports.getUpcomingEvents(req, res, next);
    }

    if (eventId === "mostRecentEvents") {
      return exports.getMostRecentEvents(req, res, next);
    }


    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (err) {
    next(err);
  }
};

exports.createEvent = async (req, res, next) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (err) {
    if (err.name === 'ValidationError') {
      err.statusCode = 400;
    }
    next(err);
  }
};

exports.updateEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (err) {
    next(err);
  }
};

exports.deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err) {
    next(err);
  }
};
