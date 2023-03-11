const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  firstName: String,
  surname: String,
  address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
});

const studentModel = mongoose.model("Students", studentSchema);

module.exports = studentModel;


