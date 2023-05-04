const jwt = require("jsonwebtoken");
const mysecretKey = "mysecretKey";
const generateToken = (id) => {
  return jwt.sign({ id }, mysecretKey, { expiresIn: "3d" });
};
module.exports = { generateToken };
