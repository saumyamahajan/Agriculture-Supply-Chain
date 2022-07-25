const express = require("express");
const { getAllUsers, getUser, addUser, updateUser, deleteUser } = require("../controllers/userController");

const router = express.Router();
router.get("/", getAllUsers);
router.post("/login", getUser);
router.get("/:id", getUser);
router.post("/", addUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports ={routes: router};