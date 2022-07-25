const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
    farmerId : String,
    name : String,
    startDate : Date, 
    endDate : Date, 
    activityProof : String, 
    people : [],  
    asset : [], 
    material : []
})

const activityModel = mongoose.model("Activity",activitySchema)
module.exports = activityModel