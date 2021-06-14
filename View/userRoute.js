const express = require("express");

//import middleware Auth<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<this part incomplete>>>>>>>>>>>>>>>>>
//const userAuth = require("../middleware/user");

const {
  addUser,
  getUser,

  updateUser,
  deleteUser,
  findUser,
  loginUser
} = require("../Controller/userController");
//create instance of router<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
const router = express.Router();

//post or save data on this route<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
router.post("/api/create", addUser);

//get or retrive data on this route<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
router.get("/api/user",  getUser);

//put or update data on this route<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
router.put("/api/update/:id",  updateUser);

//delete data on this route<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<,,,,,,,,,
router.delete("/api/delete/:id",  deleteUser);

//find all nearby friends from this route<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
router.get("/api/find",findUser);

//login user router<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
router.post("api/login", loginUser);

module.exports = router;
