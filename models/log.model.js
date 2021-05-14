const mongoose = require("mongoose");
const LogSchema = new mongoose.Schema({
  actionName: {
    type: String,
    required: true,
  },
  actionDate: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: String,
    required: true,
  },
});

module.exports = Log = mongoose.model("log", LogSchema);
