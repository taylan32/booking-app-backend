const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CitySchema = new Schema(
  {
    name: String,
  },
  { timestamps: true, versionKey: false }
);
module.exports = mongoose.model("City", CitySchema);
