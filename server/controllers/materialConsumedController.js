const activityModel = require("../models/activity")
const ObjectId  = require("mongodb").ObjectId;

const getAllMaterialConsumed = async (req, res, next) => {
  try {
      const activityId = req.params.activityId;
      console.log("All materialConsumed func, activityId : " + activityId);
      activityModel.find({'activityId' : activityId}).exec(function (err, result){
          if(err) throw err
          else res.status(200).json(result);
      })
     
  } catch (error) {
     res.status(400).json({ message: error.message });
    }

};

const getMaterialConsumed = async (req, res, next) => {
  try {
      const materialConsumedId = req.params.materialConsumedId;
      const activityId = req.params.activityId;
      console.log("Getting materialConsumed = %s", materialConsumedId + " / " + activityId);
     // activityModel.find({'_id' : ObjectId(activityId) , 'people.assetId' : assetId}).exec(function (err, result){
       // activityModel.find( { people: { $elemMatch:{  'assetId':assetId } } }).exec(function (err, result){
        activityModel.aggregate([
          {
            $unwind: '$material'
          },
          {
            $match: {
              '_id' : ObjectId(activityId),
              'material.materialConsumedId' : materialConsumedId
            }
          }
        ]).exec(function (err, result){
          if(err) throw err
          else { console.log("materialConsumed res:"+result)
            res.status(200).json(result);}
      })
  } catch (error) {
      res.status(400).json({ message: error.message });
    }

};


const createMaterialConsumed = function(activityId, materialConsumed) {
    console.log("\n>> Add materialConsumed:\n");
    return activityModel.findByIdAndUpdate(
        activityId,
      {
        $push: {
            material: {
            materialConsumedId: Date.now().toString(36) + Math.random().toString(36).slice(2),
            materialConsumedReceipt: materialConsumed.materialConsumedReceipt,
            materialConsumedDetails: materialConsumed.materialConsumedDetails,
          }
        }
      },
      { new: true, useFindAndModify: false }
    );
  };

const addMaterialConsumed = async  (req, res, next) => {
    try {
        const activityId = req.params.id
        console.log("Adding new materialConsumed : " + activityId);
        const data = req.body;
        
        var materialConsumed = await createMaterialConsumed(ObjectId(activityId), {
            // materialConsumedReceipt : "yes",
            // materialConsumedDetails : "fertilizers, pesticides", 

            materialConsumedReceipt: req.body.material.materialConsumedReceipt,
            materialConsumedDetails: req.body.material.materialConsumedDetails
        });
        console.log("\n>> activity:\n", materialConsumed); 
        res.status(201).json({ message: "materialConsumed saved successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
      }

};

const updateMaterialConsumed = async  (req, res, next) => {
    try {
      const materialConsumedId = req.params.materialConsumedId
      const activityId = req.params.activityId
      console.log("updating materialConsumed : " + materialConsumedId + "activityId : " + activityId);
      console.log("materialConsumed details : "+req.body.material.materialConsumedReceipt +" , "+req.body.material.materialConsumedDetails)
      
      activityModel.findOneAndUpdate({'_id' : ObjectId(activityId), 'material.materialConsumedId' : materialConsumedId} , 
        {
            $set : {
              // "material.$.materialConsumedReceipt" : "updated yes",
              // "material.$.materialConsumedDetails" : "updated fertilizers, pesticides", 

                
              "material.$.materialConsumedReceipt": req.body.material.materialConsumedReceipt,
              "material.$.materialConsumedDetails": req.body.material.materialConsumedDetails
            }
        }, 
        function(err, result){
            if (err) throw err;
            else res.status(201).json({ message: "materialConsumed updated successfully" });
        })
      
    } catch (error) {
        res.status(400).json({ message: error.message });
      }

};

const deleteMaterialConsumed = async  (req, res, next) => {
    try {
      const materialConsumedId = req.params.materialConsumedId
      const activityId = req.params.activityId
      console.log("deleting materialConsumed : " + materialConsumedId + "activityId : " + activityId);
      activityModel.findOneAndUpdate({'_id' : ObjectId(activityId)} , 
      {
        $pull: {
          'material' : {'materialConsumedId': materialConsumedId}
        }
      },
      {new:true},
      function(err, result){
          if (err) throw err;
          else res.status(200).json({ message: "1 materialConsumed deleted" });
      })
    } catch (error) {
        res.status(400).json({ message: error.message });
      }

};

module.exports = {
    getAllMaterialConsumed,
    getMaterialConsumed,
    addMaterialConsumed,
    updateMaterialConsumed,
    deleteMaterialConsumed
}