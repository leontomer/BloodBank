const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bloodSchema = new Schema({
  name: { type: String, required: true },
  bloodType: { type: String, required: true },
  bloodAmount: { type: Number, required: true },
  phoneNumber: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Blood = mongoose.model("Blood", bloodSchema);
module.exports = Blood;
