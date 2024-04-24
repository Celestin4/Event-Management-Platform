const express = require("express");
const router = express.Router();
const eventRoutes = require('./eventRoutes')
const authRoutes = require('./authRoutes')
const  bookingRoutes = require('./bookingRoutes') 

router.use('/events', eventRoutes)
router.use('/auth', authRoutes)
router.use('/booking', bookingRoutes)



module.exports = router;