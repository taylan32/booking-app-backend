const City = require("../models/City");

const insert = (cityData) => {
  const city = new City(cityData);
  return city.save();
};

const list = (where) => {
  return City.find(where || {});
};

const findOne = (where) => {
  return City.findById(where);
};
const modify = (id, updateData) => {
  return City.findByIdAndUpdate(id, updateData, { new: true });
};
const remove = (id) => {
  return City.findByIdAndDelete(id);
};
const findByName = (cityName) => {
  return City.findOne(cityName);
};

module.exports = {
  insert,
  list,
  findOne,
  modify,
  remove,
  findByName,
};
