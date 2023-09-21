const mongoose = require("mongoose");

const vaccineUserSchema = new mongoose.Schema({
  englishName: {
    type: String,
    required: true,
  },
  chineseName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  address: String,
  placeOfBirth: String,
  vaccineBrand: {
    type: String,
    enum: ["Pfizer", "Moderna", "AstraZeneca", "Johnson & Johnson"],
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  hashedPhoneNumber: {
    type: String,
    required: true,
  },
  hashedID: {
    type: String,
    required: true,
  },
  idFirst5Characters: {
    type: String,
    required: true,
  },
  randomSalt: {
    type: String,
    required: true,
  },
  // You can include additional fields such as appointment time, status, etc.
});

const VaccineUser = mongoose.model("VaccineUser", vaccineUserSchema);

module.exports = VaccineUser;
