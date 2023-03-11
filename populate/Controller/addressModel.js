
const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  streetName: String,
  streetNumber: String,
  postCode: String,
  city: String,
});

const addressModel = mongoose.model("Address", addressSchema);

module.exports = addressModel;

