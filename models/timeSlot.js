const mongoose = require("mongoose");

const timeSlotSchema = new mongoose.Schema({
  startTime: {
    type: Date,
    required: true,
  },
  registeredUserId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the user who registered for the time slot
    ref: "VaccineUser", // Assuming 'VaccineUser' is the name of the model for vaccine users
    default: null, // Initially, no user is registered
  },
  isIngested: {
    type: Boolean,
    default: false,
  },
});

const TimeSlot = mongoose.model("TimeSlot", timeSlotSchema);

module.exports = TimeSlot;
