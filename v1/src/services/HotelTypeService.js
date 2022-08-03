const HotelType = require("../models/HotelType");

const insert = (data) => {
  const hotelType = new HotelType(data);
  return hotelType.save();
};

const list = (where) => {
  return HotelType.find(where || {});
};

const findOne = (where) => {
  return HotelType.findById(where);
};

const modify = (id, updateData) => {
  return HotelType.findByIdAndUpdate(id, updateData, { new: true });
};

const remove = (id) => {
  return HotelType.findByIdAndDelete(id);
};

const findByName = (typeName) => {
  return HotelType.findOne(typeName);
};

module.exports = {
  insert,
  list,
  findOne,
  modify,
  remove,
  findByName,
};
