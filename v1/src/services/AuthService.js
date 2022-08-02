const User = require("../models/User");

const createUser = (userData) => {
  const user = new User(userData);
  user.image = "default.png";
  if (user.isAdmin == null) user.isAdmin = false;
  return user.save();
};


const loginUser = (loginData) => {
    return User.findOne(loginData)
}

module.exports = {
  createUser,
  loginUser
};
