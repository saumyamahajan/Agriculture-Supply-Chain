const express = require("express");
const { getAllFarmers, getFarmer, addFarmer, updateFarmer, deleteFarmer } = require("../controllers/farmerController");
// const { getAllTutorials, getTutorial } = require("../controllers/TutorialController");

const router = express.Router();
router.get("/", getAllFarmers);
router.get("/:id", getFarmer);
router.post("/", addFarmer);
router.put("/:id", updateFarmer);
router.delete("/:id", deleteFarmer);



module.exports ={routes: router};