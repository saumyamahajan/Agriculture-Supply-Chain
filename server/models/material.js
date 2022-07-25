const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({
    type : String,
    unit : Number, 
    storageLocation : String
})