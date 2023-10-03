const bcrypt = require("bcrypt");  //Used to encypt the passwords
const Joi = require("joi");  //joi package is Used for input data validations
const jwt = require("jsonwebtoken");  //Its an authentication type,function used to verify token
const { TRUE, ERR } = require("../constants");
const { verifyUsernameAndEmailExisits } = require("./verifyUsernameAndEmailExisits");
const User = require("../models/UserSchema");
const { addUserToDB,getUserDataFromUsername,getUserDataFromEmail} = require("../implementers/userdbfunctions");

const BCRYPT_SALTS = Number(process.env.BCRYPT_SALTS);  //Number of passes the password will go through the bcrypt algorithm

// POST - Register User
const registerUser = async (req, res) => {
  // Data validation
  const isValid = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().min(3).max(30).alphanum().required(),
    password: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
  }).validate(req.body);

  if (isValid.error) {
    return res.status(400).send({
      status: 400,
      message: "Invalid Input",
      data: isValid.error,
    });
  }

  // Checking whether we have any username or email already exisiting in our DB
  const isUserExisiting = await verifyUsernameAndEmailExisits(
    req.body.email,
    req.body.username
  );

  if (isUserExisiting === TRUE) {
    return res.status(400).send({
      status: 400,
      message: "Email or Username already exists.",
    });
  } else if (isUserExisiting === ERR) {
    return res.status(400).send({
      status: 400,
      message: "Err: Verification for UsernameAndEmailExisits failed",
    });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, BCRYPT_SALTS);  //Encrypting the password

  const userObj = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });

  const response = await addUserToDB(userObj);

  if (response === ERR) {
    res.status(400).send({
      status: 400,
      message: "DB Error: Failed to add new user",
    });
  } else if (response === TRUE) {
    res.status(201).send({
      status: 201,
      message: "User added successfully",
    });
  }
};

// POST - Login user
const loginUser = async (req, res) => {
  const { loginId, password } = req.body;

  const isEmail = Joi.object({
    loginId: Joi.string().email().required(),
  }).validate({ loginId });

  let userData;

  if (isEmail.error) {         //If the user given loginId as username instead of Email,then get details of user with Username
    userData = await getUserDataFromUsername(loginId);
    if (userData.err) {
      return res.status(400).send({
        status: 400,
        message: "DB error: getUserDataFromUsername failed",
        data: userData.err,
      });
    }
  } else {
    userData = await getUserDataFromEmail(loginId);  //If the email is correct,then get user details with Email

    if (userData.err) {
      return res.status(400).send({
        status: 400,
        message: "DB error: getUserDataFromEmail failed",
        data: userData.err,
      });
    }
  }

  if (!userData.data) {         //If user data not found
    return res.status(400).send({
      status: 400,
      message: "No user found! Please register",
    });
  }

  const isPasswordMatching = await bcrypt.compare(  //comparing the login password with encrypted registered password
    password,
    userData.data.password
  );

  if (!isPasswordMatching) {
    return res.status(400).send({
      status: 400,
      message: "Incorrect Password",
    });
  }

  const payload = {                   //Payload for generating JWT token
    username: userData.data.username,
    name: userData.data.name,
    email: userData.data.email,
    userId: userData.data._id,
  };

  const token = await jwt.sign(payload, process.env.JWT_SECRET);  //After login creating the JWT token using Payload and JWT Secret Key and sending to UI

  res.status(200).send({
    status: 200,
    message: "Logged in successfully",
    data: {
      token,
    },
  });
};

module.exports = { registerUser, loginUser };