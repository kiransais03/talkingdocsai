const { TRUE, ERR } = require("../constants");
const User = require("../models/UserSchema");

const findUsersWithEmailOrUsername = async (email, username) => {
  let userData = {
    data: null,
    err: null,
  };
  try {
    // DB call to find if any records exists with the email and username given
    userData.data = await User.find({ $or: [{ email }, { username }] });  //'$or' is OR operator,it checks for match of atleast one filed

    return userData;
  } catch (err) {
    userData.err = err;
    return userData;
  }
};

const addUserToDB = async (userObj) => {
  try {
    await userObj.save();

    return TRUE;
  } catch (err) {
    return ERR;
  }
};

const getUserDataFromUsername = async (username) => {
  const userData = {
    data: null,
    err: null,
  };

  try {
    userData.data = await User.findOne({ username });

    return userData;
  } catch (err) {
    userData.err = err;
    return userData;
  }
};

const getUserDataFromEmail = async (email) => {
  const userData = {
    data: null,
    err: null,
  };

  try {
    userData.data = await User.findOne({ email });
    console.log(userData.data);

    return userData;
  } catch (err) {
    userData.err = err;
    return userData;
  }
};

module.exports = {
  findUsersWithEmailOrUsername,
  addUserToDB,
  getUserDataFromEmail,
  getUserDataFromUsername,
};