const Event = require('../models/eventModel');

exports.getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find();
    if (!events) {
      const error = new Error('Events not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(events);
  } catch (err) {
    next(err);
  }
};

exports.getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      const error = new Error('Event not found');
      error.statusCode = 404;
      throw error;
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
      const error = new Error('Event not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(event);
  } catch (err) {
    next(err);
  }
};

exports.deleteEvent = async (req, res) => {

  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      res.status(404).json({message: 'Event is not found'})
    }
    res.status(201).json({message: 'Event deleted successfly'});
  } catch (err) {
    res.status(500).json({message: 'server error'})
  }
};
