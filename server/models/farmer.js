const mongoose = require("mongoose");

const farmerSchema = new mongoose.Schema({
    // userId : String,
    name : String,
    district : String,
    contact : Number, 
    landMapping : Number
})

const farmerModel = mongoose.model("Farmer",farmerSchema)
module.exports = farmerModel