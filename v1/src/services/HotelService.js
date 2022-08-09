const Hotel = require("../models/Hotel");

const insert = (hotelData) => {
  let hotel = new Hotel(hotelData);
  return hotel.save();
};

const list = (where) => {
  return Hotel.find(where || {})
    .populate({
      path: "city",
      select: "name",
    })
    .populate({
      path: "type",
      select: "name",
    });
};

const findOne = (where) => {
  return Hotel.findById(where)
    .populate({
      path: "city",
      select: "name",
    })
    .populate({
      path: "type",
      select: "name",
    });
};

const modify = (id, updateData) => {
  return Hotel.findByIdAndUpdate(id, updateData, { new: true });
};

const remove = (id) => {
  return Hotel.findByIdAndDelete(id);
};

const countByField = (field) => {
  return Hotel.find({}).countDocuments(field);
};

module.exports = {
  insert,
  list,
  findOne,
  modify,
  remove,
  countByField,
};
