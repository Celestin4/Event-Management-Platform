const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes =  require('./routes/index')
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/', routes)

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("connected to Database successiflly");
    } catch (error) {
      console.log("Error occurred: ", error.message);
      process.exit(1);
    }
  };
  
  connectDB();

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
