const express = require("express");
const {   getAllPeople, getPeople, addPeople, updatePeople, deletePeople} = require("../controllers/peopleController");

const router = express.Router();

router.get("/:activityId", getAllPeople);
router.get("/:activityId/:peopleId", getPeople);
router.post("/:activityId", addPeople);
router.put("/:activityId/:peopleId", updatePeople);
router.delete("/:activityId/:peopleId", deletePeople);

module.exports ={routes: router};