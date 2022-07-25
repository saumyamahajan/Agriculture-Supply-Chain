const activityModel = require("../models/activity")
const ObjectId  = require("mongodb").ObjectId;

const getAllAsset = async (req, res, next) => {
  try {
      const activityId = req.params.activityId;
      console.log("All asset func, activityId : " + activityId);
      activityModel.find({'activityId' : activityId}).exec(function (err, result){
          if(err) throw err
          else res.status(200).json(result);
      })
     
  } catch (error) {
     res.status(400).json({ message: error.message });
    }

};

const getAsset = async (req, res, next) => {
  try {
      const assetId = req.params.assetId;
      const activityId = req.params.activityId;
      console.log("Getting asset = %s", assetId + " / " + activityId);
     // activityModel.find({'_id' : ObjectId(activityId) , 'people.assetId' : assetId}).exec(function (err, result){
       // activityModel.find( { people: { $elemMatch:{  'assetId':assetId } } }).exec(function (err, result){
        activityModel.aggregate([
          {
            $unwind: '$asset'
          },
          {
            $match: {
              '_id' : ObjectId(activityId),
              'asset.assetId' : assetId
            }
          }
        ]).exec(function (err, result){
          if(err) throw err
          else { console.log("asset res:"+result)
            res.status(200).json(result);}
      })
  } catch (error) {
      res.status(400).json({ message: error.message });
    }

};

const createAsset = function(activityId, asset) {
    console.log("\n>> Add asset:\n");
    return activityModel.findByIdAndUpdate(
        activityId,
      {
        $push: {
          asset: {
            assetId: Date.now().toString(36) + Math.random().toString(36).slice(2),
            assetName: asset.assetName,
            assetDriver: asset.assetDriver,
            assetDetails: asset.assetDetails,
            assetWages: asset.assetWages
          }
        }
      },
      { new: true, useFindAndModify: false }
    );
  };

const addAsset = async  (req, res, next) => {
    try {
        const activityId = req.params.activityId
        console.log("Adding new asset : " + activityId);
        const data = req.body;
        
        var asset = await createAsset(ObjectId(activityId), {
            // assetName : "tractor",
            // assetDriver : "dane", 
            // assetDetails : "gps tracker", 
            // assetWages : "4000"

            assetName : req.body.asset.assetName,
            assetDriver: req.body.asset.assetDriver,
            assetDetails: req.body.asset.assetDetails,
            assetWages: req.body.asset.assetWages
 
        });
        console.log("\n>> activity:\n", asset); 
        res.status(201).json({ message: "asset saved successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
      }

};

const updateAsset = async  (req, res, next) => {
    try {
      const assetId = req.params.assetId
      const activityId = req.params.activityId
      console.log("updating asset : " + assetId + "activityId : " + activityId);
      console.log("asset name : "+req.body.asset.assetName+","+req.body.asset.assetDriver+","+req.body.asset.assetDetails+","+req.body.asset.assetWages)
      activityModel.findOneAndUpdate({'_id' : ObjectId(activityId), 'asset.assetId' : assetId} , 
        {
            $set : {
              // "asset.$.assetName" : "updated tractor",
              // "asset.$.assetDriver" : "updated dane", 
              // "asset.$.assetDetails" : "updated gps tracker", 
              // "asset.$.assetWages" : "4000"

              "asset.$.assetName" : req.body.asset.assetName,
              "asset.$.assetDriver": req.body.asset.assetDriver,
              "asset.$.assetDetails": req.body.asset.assetDetails,
              "asset.$.assetWages": req.body.asset.assetWages
            }
        }, 
        function(err, result){
            if (err) throw err;
            else res.status(201).json({ message: "asset updated successfully" });
        })
      
    } catch (error) {
        res.status(400).json({ message: error.message });
      }

};

const deleteAsset = async  (req, res, next) => {
    try {
      const assetId = req.params.assetId
      const activityId = req.params.activityId
      console.log("deleting asset : " + assetId + "activityId : " + activityId);
      activityModel.findOneAndUpdate({'_id' : ObjectId(activityId)} , 
      {
        $pull: {
          'asset' : {'assetId': assetId}
        }
      },
      {new:true},
      function(err, result){
          if (err) throw err;
          else res.status(200).json({ message: "1 asset deleted" });
      })
    } catch (error) {
        res.status(400).json({ message: error.message });
      }

};

module.exports = {
    getAllAsset,
    getAsset,
    addAsset,
    updateAsset,
    deleteAsset
}