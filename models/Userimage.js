const mongoose = require("mongoose");

const UserimgSchema = mongoose.Schema({
  userimage: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("userimage", UserimgSchema);
