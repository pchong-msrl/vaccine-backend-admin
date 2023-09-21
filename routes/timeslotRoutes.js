const express = require("express");
const router = express.Router();
const TimeSlot = require("../models/timeSlot"); // Import the TimeSlot model
const VaccineUser = require("../models/vaccineUser"); // Import the VaccineUser model
const authenticateToken = require("../middlewares/authMiddleware"); // Import the authentication middleware

// Create a timeslot
router.post("/create", authenticateToken, async (req, res) => {
  try {
    // Create a new timeslot without a registered user
    const newTimeSlot = new TimeSlot({
      startTime: req.body.startTime,
    });

    // Save the timeslot to the database
    await newTimeSlot.save();

    // console.log("req:", req.body);

    res.status(201).json({
      message: "Timeslot created successfully",
      timeSlot: newTimeSlot,
    });
  } catch (error) {
    res.status(500).json({ error: "Timeslot creation failed" });
  }
});

// List timeslots with registered user information (where registeredUserId is not null)
router.get("/with-registered-users", authenticateToken, async (req, res) => {
  try {
    // Find all timeslots where registeredUserId is not null
    const timeslotsWithRegisteredUsers = await TimeSlot.find({
      registeredUserId: { $ne: null },
    }).populate("registeredUserId");

    res.json({ timeslotsWithRegisteredUsers });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch timeslots with registered users" });
  }
});

module.exports = router;
