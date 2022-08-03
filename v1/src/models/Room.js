const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoomSchema = new Schema(
  {
    title: String,
    hotelId: {
        type:mongoose.Types.ObjectId,
        ref:"Hotel"
    },
    price: Number,
    maxPeople: Number,
    description: String,
    roomNumber: Number,
    isAvailable: Boolean,
    unAvailableDates: [Date],
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Room", RoomSchema);
