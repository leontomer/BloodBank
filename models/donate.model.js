const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DonateBloodSchema = new Schema({
  name: { type: String, required: true },
  bloodType: { type: String, required: true },
  bloodAmount: { type: Number, required: true },
  phoneNumber: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const BloodDonates = mongoose.model("BloodDonates", DonateBloodSchema);
module.exports = BloodDonates;
