const activityModel = require("../models/activity")
const ObjectId  = require("mongodb").ObjectId;


const getAllActivities= async (req, res, next) => {
    try {
        const farmerId = req.params.farmerId;
        console.log("All activities func, farmerId : " + farmerId);
        activityModel.find({'farmerId' : farmerId}).exec(function (err, result){
            if(err) throw err
            else res.status(200).json(result);
        })
       
    } catch (error) {
       res.status(400).json({ message: error.message });
      }

};

const getActivity= async (req, res, next) => {
    try {
        const activityId = req.params.id;
        console.log("Getting activity = %s", activityId);
        activityModel.find({'_id' : ObjectId(activityId)}).exec(function (err, result){
            if(err) throw err
            else res.status(200).json(result);
        })
    } catch (error) {
        res.status(400).json({ message: error.message });
      }

};

const createActivity = function(activity) {
    return activityModel.create(activity).then(docActivity => {
      console.log("\n>> Created activity:\n", docActivity);
      return docActivity;
    });
  };

const addActivity = async  (req, res, next) => {
    try {
        console.log("Adding new activity");
        const data = req.body;

        const farmerId = req.params.farmerId;
        console.log("farmerId : " + farmerId);
        const name = req.body.name;
        console.log("activity name : " + name);
        // console.log("filename:"+req.file.filename);
        //let activityProof = req.files.activityProof;
        // if (!req.files) {
        //     res.send("File was not found");
        //     return;
        //   }
        
        // const activityProof = req.files.file;
        // console.log("activityProof : " + activityProof);
       //const myFile = req.files.file;
       // console.log("myFile : " + myFile);
        //from body
        // const farmerId1 = req.body.farmerId;
        // console.log("farmerId from body: " + farmerId1);

        var activity = await createActivity({
            farmerId : farmerId,
            // name : "jane",  
            // startDate : new Date("2022-06-25") ,
            // endDate :  new Date("2022-07-25"),
            // activityProof : "yes",
            
            name : req.body.name,
            startDate : req.body.startDate,
            endDate : req.body.endDate,
            //activityProof : req.body.activityProof
             activityProof : req.file.filename
        });
        console.log("\n>> activity:\n", activity); 
        res.status(201).json({ message: "activity saved successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
      }

};

const updateActivity = async  (req, res, next) => {
    try {
        const activityId = req.params.id;
        console.log("updated activity = %s", activityId+" ,proof:"+req.body.activityProof);
        let activityProof = '';
        if(!req.body.activityProof){
            console.log("updated activity check if file");
            activityProof = req.file.filename
        }
        else {
            console.log("updated activity check else file : " + req.body.activityProof);
            activityProof = req.body.activityProof
        }
       // console.log("filename:"+req.file.filename);
        activityModel.findOneAndUpdate({'_id' : ObjectId(activityId)} , 
        {
            $set : {
                // name : "updated jane",  
                // startDate : new Date("2022-06-25") ,
                // endDate :  new Date("2022-07-25"),
                // activityProof : "updated yes",

                name : req.body.name,
                startDate : req.body.startDate,
                endDate : req.body.endDate,
                activityProof : activityProof
            }
        }, 
        function(err, result){
            if (err) throw err;
            else res.status(200).json({ message: "1 activity updated" });
        })

    } catch (error) {
        res.status(400).json({ message: error.message });
      }

};

const deleteActivity = async  (req, res, next) => {
    try {
        const activityId = req.params.id;
        console.log("deleted activity = %s", activityId);
        activityModel.deleteOne({'_id' : ObjectId(activityId)} , function(err, result){
            if (err) throw err;
            else res.status(200).json({ message: "1 activity deleted" });
        })
        
    } catch (error) {
        res.status(400).json({ message: error.message });
      }

};

const uploadActivity = async  (req, res, next) => {
    try {
        
        console.log("fileupload activity :");
        console.log("data:"+req.body.dat);
        console.log("filename:"+req.file.filename);
       // res.status(201).json({ message: "activity uploaded successfully" });
       //file = req.files.FormFieldName;  // here is the field name of the form
      res.send("File Uploaded");
    } catch (error) {
        res.status(400).json({ message: error.message });
      }

};

module.exports = {
    getAllActivities,
    getActivity,
    addActivity,
    updateActivity,
    deleteActivity,
    uploadActivity
}