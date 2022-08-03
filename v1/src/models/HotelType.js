const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HotelTypeSchema = new Schema(
  {
    name: String,
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("HotelType", HotelTypeSchema);
