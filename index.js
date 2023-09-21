const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes"); // Import userRoutes
const timeSlotRoutes = require("./routes/timeslotRoutes"); // Import timeSlotRoutes

// Create an Express application
const app = express();
const port = process.env.PORT || 8000;

// Connect to MongoDB
mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.at2utsm.mongodb.net/?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use the userRoutes for user-related endpoints
app.use("/api/users", userRoutes);
app.use("/api/timeslots", timeSlotRoutes);

// Enable CORS
app.use(cors());

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
