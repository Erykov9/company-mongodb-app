const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  // _id: { type: String, required: true },
  name: { type: String, required: true }
});

module.exports = mongoose.model('Department', departmentSchema);