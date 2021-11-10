const mongoose = require("mongoose");
const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"],
  },
  age: {
    type: Number,
    required: [true, "Please tell us your age"],
  },
  gender: {
    type: String,
    required: [true, "Please tell yoour gender"],
  },
  phone: {
    type: String,
    required: [true, "Please enter phone"],
  },
  purpose: {
    type: String,
    required: [true, "Please tell your purpose of visit"],
  },
});

const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;
