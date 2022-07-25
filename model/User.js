//SCHEMA FOR USER

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    max: 225,
    min: 6,
  },
  mobile: {
    type: String,
    required: true,
    max: 15,
    min: 10,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 8,
  },
  roleId: {
    type: String,
    default: "0",
  },
  permissions:{
    type:Array,
    default:[]
  },
  created: {
    type: Date,
    default: Date.now,
  },
  students:{
    type:Array,
    default:[],
  },
});

module.exports = mongoose.model("User", userSchema);

