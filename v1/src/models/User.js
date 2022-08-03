const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userLogger = require("../scripts/loggers/UserLogger");

const UserSchema = new Schema(
  {
    email: String,
    password: String,
    image: String,
    firstName: String,
    lastName: String,
    country: String,
    city: String,
    phone: String,
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

UserSchema.post("save", (doc) => {
  userLogger.log({
    level: "info",
    message: doc,
  });
});

module.exports = mongoose.model("User", UserSchema);
