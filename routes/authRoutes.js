const express = require("express");
const {
  createUser,
  loginUserCtrl,
  getAllUser,
  getSingleUser,
  deleteUser,
  updateUser,
  forgetPassword,
} = require("../controller/usercontroller");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUserCtrl);
router.get("/get-allUser", getAllUser);
router.get("/:id", getSingleUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);
router.post("/forget-password", forgetPassword);

module.exports = router;
