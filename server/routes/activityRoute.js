const express = require("express");
const multer = require('multer');
const { getAllActivities, getActivity, addActivity, updateActivity, deleteActivity ,uploadActivity} = require("../controllers/activityController");


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads/');
   
    },
    filename: function(req, file, cb) {   
              cb(null, file.originalname);
           
    }
});
var upload = multer({ storage: storage }).single('activityProof');


const router = express.Router();
router.get("/:farmerId", getAllActivities);
// router.get("/:farmerId/:id", getActivity);
router.get("/1/:id", getActivity);
//router.post("/:farmerId", addActivity);
router.post("/:farmerId", upload, addActivity);
// router.put("/:id", updateActivity);
router.put("/:id",upload, updateActivity);
router.delete("/:id", deleteActivity);
//router.post("/", upload,uploadActivity);




module.exports ={routes: router};