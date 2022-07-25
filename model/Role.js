//SCHEMA FOR ROLE

const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  scopes: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("Role", roleSchema);
