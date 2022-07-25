//SCHEMA FOR SCHOOL
const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  students: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("School", schoolSchema);
