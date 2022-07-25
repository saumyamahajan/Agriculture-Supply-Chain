const farmerModel = require("../models/farmer")
const ObjectId  = require("mongodb").ObjectId;

const getAllFarmers= async (req, res, next) => {
    try {
        console.log("All farmers func");
        farmerModel.find({}).exec(function (err, result){
            if(err) throw err
            else res.status(200).json(result);
        })

    } catch (error) {
       res.status(400).json({ message: error.message });
      }

};

const getFarmer= async (req, res, next) => {
    try {
        const farmerId = req.params.id;
        console.log("Getting farmer = %s", farmerId);
        farmerModel.find({'_id' : ObjectId(farmerId)}).exec(function (err, result){
            if(err) throw err
            else res.status(200).json(result);
        })

    } catch (error) {
        res.status(400).json({ message: error.message });
      }

};

const createFarmer = function(farmer) {
    return farmerModel.create(farmer).then(docFarmer => {
      console.log("\n>> Created farmer:\n", docFarmer);
      return docFarmer;
    });
  };

const addFarmer = async  (req, res, next) => {
    try {
        console.log("Adding new farmer");
        const data = req.body;

        var farmer = await createFarmer({
            // name : "Loki",  
            // district : "24 Northingham",
            // contact : "9274982738", 
            // landMapping : "100"
            name : req.body.name,  
            district : req.body.district,
            contact : req.body.contact, 
            landMapping : req.body.landMapping
        });
        console.log("\n>> farmer:\n", farmer); 
        res.status(201).json({ message: "farmer saved successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
      }

};

const updateFarmer = async  (req, res, next) => {
    try {
        const farmerId = req.params.id;
        console.log("updated activity = %s", farmerId);
        farmerModel.findOneAndUpdate({'_id' : ObjectId(farmerId)} , 
        {
            $set : {
                // name : "updated Loki",  
                // district : "updated 24 Northingham",
                // contact : "9274982738", 
                // landMapping : "100"
                name : req.body.name,  
                district : req.body.district,
                contact : req.body.contact, 
                landMapping : req.body.landMapping
            }
        }, 
        function(err, result){
            if (err) throw err;
            else res.status(200).json({ message: "1 farmer updated" });
        })

    } catch (error) {
        res.status(400).json({ message: error.message });
      }

};

const deleteFarmer = async  (req, res, next) => {
    try {
        const farmerId = req.params.id;
        console.log("deleted farmer = %s", farmerId);
        farmerModel.deleteOne({'_id' : ObjectId(farmerId)} , function(err, result){
            if (err) throw err;
            else res.status(200).json({ message: "1 farmer deleted" });
        })
        
    } catch (error) {
        res.status(400).json({ message: error.message });
      }

};

module.exports = {
    getAllFarmers,
    getFarmer,
    addFarmer,
    updateFarmer,
    deleteFarmer
}