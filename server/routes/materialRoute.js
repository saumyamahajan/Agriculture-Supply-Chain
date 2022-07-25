const express = require("express");
const {  getAllMaterials , getMaterial } = require("../controllers/materialController");

const router = express.Router();
router.get("/", getAllMaterials);
router.get("/:id", getMaterial);


module.exports ={routes: router};