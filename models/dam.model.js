const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bloodSchema = new Schema({
  bloodType: { type: String, required: true },
  bloodAmount: { type: Number, required: true },
});

const Blood = mongoose.model("Blood", bloodSchema);
module.exports = Blood;
