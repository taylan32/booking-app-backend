const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const hotelLogger = require("../scripts/loggers/HotelLogger");
const HotelSchema = new Schema(
  {
    name: String,
    type: {
      type: mongoose.Types.ObjectId,
      ref: "HotelType",
    },
    city: {
      type: mongoose.Types.ObjectId,
      ref: "City",
    },
    address: String,
    distance: String,
    photos: [String],
    title: String,
    description: String,
    rating: Number,
    rooms: [String],
    cheapestPrice: Number,
    featured: Boolean,
  },
  { timestamps: true, versionKey: false }
);

HotelSchema.post("save", (doc) => {
  hotelLogger.log({
    level: "info",
    message: doc,
  });
});

module.exports = mongoose.model("Hotel", HotelSchema);
