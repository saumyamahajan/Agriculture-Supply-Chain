const express = require("express");
const { getAllMaterialConsumed, getMaterialConsumed, addMaterialConsumed, updateMaterialConsumed, deleteMaterialConsumed } = require("../controllers/materialConsumedController");

const router = express.Router();

router.get("/:activityId", getAllMaterialConsumed);
router.get("/:activityId/:materialConsumedId", getMaterialConsumed);
router.post("/:id", addMaterialConsumed);
router.put("/:activityId/:materialConsumedId", updateMaterialConsumed);
router.delete("/:activityId/:materialConsumedId", deleteMaterialConsumed);

module.exports ={routes: router};