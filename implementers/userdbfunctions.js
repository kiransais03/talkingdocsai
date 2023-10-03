const { TRUE, ERR } = require("../constants");
const User = require("../models/UserSchema");

const findUsersWithEmailOrUsername = async (email, username) => {
  let userData = {
    data: null,
    err: null,
  };
  try {
    // DB call to find if any records exists with the email and username given
    userData.data = await User.find({ $or: [{ email }, { username }] });  //'$or' is OR operator,it checks for match of atleast one field

    return userData;
  } catch (err) {
    userData.err = err;
    return userData;
  }
};

const addpdfLocation = async (newpdflocation,email)=>{  //Adding the pdf location to user object in DB

  console.log("Hello this add pdf location")
  const userData = {
    data: null,
    err: null,
  };

  try{
    userData.data =  await User.updateOne({email:email},{$set : {pdflocation :newpdflocation}});
    console.log("Hello this add pdf location 2323")
    return userData;
  } catch (err) {

    userData.err = err;
    console.log(err);
    res.status(400).send({
      status:400,
      message:"Failed to add location to DB",
      errorobject : err,
    })
  }
}


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
    console.log("Getting data from email",userData.data);

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
  addpdfLocation,
};