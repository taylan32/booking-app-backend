const Room = require("../models/Room");

const insert = (roomData) => {
  const room = new Room(roomData);
  return room.save();
};

const list = (where) => {
  return Room.find(where || {});
};

const findOne = (where) => {
  return Room.findById(where);
};

const modify = (id, updateData) => {
  return Room.findByIdAndUpdate(id, updateData, { new: true });
};

const remove = (id) => {
  return Room.findByIdAndDelete(id);
};

const findByRoomNumber = (number) => {
  return Room.findOne({ roomNumber: number });
};


module.exports = {
  insert,
  list,
  findOne,
  modify,
  remove,
  findByRoomNumber,
};
