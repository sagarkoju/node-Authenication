const { hashPassword } = require("../Helper/auth_helper");
const { generateToken } = require("../config/jwtToken");
const User = require("../models/usermodels");
const asyncHandler = require("express-async-handler");

// create user
const createUser = asyncHandler(async function (req, res) {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    // create new user
    const newUser = await User.create(req.body);
    res.json({
      success: true,
      data: newUser,
      message: "Account Created Successfully",
    });
  } else {
    // user already exist
    throw new Error("User Already Exists");
  }
});

// login controller

const loginUserCtrl = asyncHandler(async function (req, res) {
  try {
    const { email, password } = req.body;
    // check if the user exist or not

    const findUser = await User.findOne({ email });
    if (findUser) {
      res.json({
        success: true,
        data: {
          _id: findUser?._id,
          firstname: findUser?.firstname,
          lastname: findUser?.lastname,
          email: findUser?.email,
          mobile: findUser?.mobile,
          token: generateToken(findUser?._id),
        },
        message: "Account Login Successfully",
      });
    } else {
      return res.json({ success: false, message: "Incorrect Password" });
    }
  } catch (ex) {
    throw new Error("Invalid Credentials");
  }
});

// get all User

const getAllUser = asyncHandler(async function (req, res) {
  try {
    const getUser = await User.find();
    res.json({
      success: true,
      message: " Get All User display",
      data: getUser,
    });
  } catch (err) {
    throw Error(err);
  }
});

// get single user

const getSingleUser = asyncHandler(async function (req, res) {
  try {
    const { id } = req.params;
    const getUser = await User.findById(id);
    res.json({
      success: true,
      message: "get Single User",
      data: getUser,
    });
  } catch (err) {
    throw Error(err);
  }
});

// delete a user

const deleteUser = asyncHandler(async function (req, res) {
  try {
    const { id } = req.params;
    const getUser = await User.findByIdAndDelete(id);
    res.json({
      success: true,
      message: " delete User",
      data: getUser,
    });
  } catch (err) {
    throw Error(err);
  }
});

// update a user

const updateUser = asyncHandler(async function (req, res) {
  try {
    const { id } = req.params;
    const updateUser = await User.findByIdAndUpdate(
      id,
      {
        firstname: req?.body.firstname,
        lastname: req?.body.lastname,
        email: req?.body.email,
        mobile: req?.body.mobile,
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      success: true,
      message: " Update User Successfully",
      data: updateUser,
    });
  } catch (err) {
    throw Error(err);
  }
});

// forget password
const forgetPassword = asyncHandler(async function (req, res) {
  try {
    const { email, newpassword } = req.body;

    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }

    if (!newpassword) {
      res.status(400).send({ message: " password is required" });
    }
    // check
    const user = await User.findOne({ email, password });

    // validation
    if (!user) {
      res.status(400).send({
        success: false,
        message: "Wrong Email or Password",
      });
    }
    const hashed = await hashPassword(newPassword);
    await User.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).json({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (err) {
    throw Error(err);
  }
});

module.exports = {
  createUser,
  loginUserCtrl,
  getAllUser,
  getSingleUser,
  deleteUser,
  updateUser,
  forgetPassword,
};
