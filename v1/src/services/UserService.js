const User = require("../models/User");

const list = (where) => {
  return User.find(where || {});
};

const findOne = (where) => {
  return User.findById(where);
};

const modify = (id, updateData) => {
  return User.findByIdAndUpdate(id, updateData, { new: true });
};

const remove = (id) => {
  return User.findByIdAndDelete(id);
};

const findByEmail = (userEmail) => {
  return User.findOne(userEmail);
};

module.exports = {
  list,
  findOne,
  modify,
  remove,
  findByEmail
};
