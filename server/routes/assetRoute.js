const express = require("express");
const { getAllAsset, getAsset, addAsset, updateAsset, deleteAsset } = require("../controllers/assetController");

const router = express.Router();

router.get("/:activityId", getAllAsset);
router.get("/:activityId/:assetId", getAsset);
router.post("/:activityId", addAsset);
router.put("/:activityId/:assetId", updateAsset);
router.delete("/:activityId/:assetId", deleteAsset);

module.exports ={routes: router};