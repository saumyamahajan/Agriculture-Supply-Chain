const activityModel = require("../models/activity")
const ObjectId  = require("mongodb").ObjectId;

const getAllPeople = async (req, res, next) => {
  try {
      const activityId = req.params.activityId;
      console.log("All people func, activityId : " + activityId);
      activityModel.find({'activityId' : activityId}).exec(function (err, result){
          if(err) throw err
          else res.status(200).json(result);
      })
     
  } catch (error) {
     res.status(400).json({ message: error.message });
    }

};

const getPeople = async (req, res, next) => {
  try {
      const peopleId = req.params.peopleId;
      const activityId = req.params.activityId;
      console.log("Getting people = %s", peopleId + " / " + activityId);
     // activityModel.find({'_id' : ObjectId(activityId) , 'people.peopleId' : peopleId}).exec(function (err, result){
       // activityModel.find( { people: { $elemMatch:{  'peopleId':peopleId } } }).exec(function (err, result){
        activityModel.aggregate([
          {
            $unwind: '$people'
          },
          {
            $match: {
              '_id' : ObjectId(activityId),
              'people.peopleId' : peopleId
            }
          }
        ]).exec(function (err, result){
          if(err) throw err
          else { console.log("people res:"+result)
            res.status(200).json(result);}
      })
  } catch (error) {
      res.status(400).json({ message: error.message });
    }

};

const createPeople = function(activityId, people) {
    console.log("\n>> Add people:\n");
    return activityModel.findByIdAndUpdate(
        activityId,
      {
        $push: {
          people: {
            peopleId: Date.now().toString(36) + Math.random().toString(36).slice(2),
            peopleName: people.peopleName,
            peopleWork: people.peopleWork,
            peopleWages: people.peopleWages,
          }
        }
      },
      { new: true, useFindAndModify: false }
    );
  };

const addPeople = async  (req, res, next) => {
    try {
        const activityId = req.params.activityId
        console.log("Adding new people : " + activityId);
        const data = req.body;
        
        var people = await createPeople(ObjectId(activityId), {
            // peopleName : "john", 
            // peopleWork : "farmer", 
            // peopleWages : "5000"

            peopleName : req.body.people.peopleName,  
            peopleWork : req.body.people.peopleWork,
            peopleWages : req.body.people.peopleWages, 
        });
        console.log("\n>> activity:\n", people); 
        res.status(201).json({ message: "people saved successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
      }

};

const updatePeople = async  (req, res, next) => {
  try {
    const peopleId = req.params.peopleId
    const activityId = req.params.activityId
    console.log("updating people : " + peopleId + "activityId : " + activityId);
    console.log("people name : "+req.body.people.peopleName+","+req.body.people.peopleWork+","+req.body.people.peopleWages)
    //console.log("people name 1  : "+req.body.peopleName+","+req.body.peopleWork+","+req.body.peopleWages) 
    activityModel.findOneAndUpdate({'_id' : ObjectId(activityId), 'people.peopleId' : peopleId} , 
      {
          $set : {
            // "people.$.peopleName" : "updated john",
            // "people.$.peopleWork" : "updated farmer", 
            // "people.$.peopleWages" : "7000", 
            "people.$.peopleName" : req.body.people.peopleName,  
            "people.$.peopleWork" : req.body.people.peopleWork,
            "people.$.peopleWages" : req.body.people.peopleWages,
          }
      }, 
      function(err, result){
          if (err) throw err;
          else res.status(201).json({ message: "people updated successfully" });
      })
    
  } catch (error) {
      res.status(400).json({ message: error.message });
    }

};

const deletePeople = async  (req, res, next) => {
  try {
    const peopleId = req.params.peopleId
    const activityId = req.params.activityId
    console.log("deleting people : " + peopleId + "activityId : " + activityId);
    activityModel.findOneAndUpdate({'_id' : ObjectId(activityId)} , 
    {
      $pull: {
        'people' : {'peopleId': peopleId}
      }
    },
    {new:true},
    function(err, result){
        if (err) throw err;
        else res.status(200).json({ message: "1 people deleted" });
    })
  } catch (error) {
      res.status(400).json({ message: error.message });
    }

};

module.exports = {

    getAllPeople,
    getPeople,
    addPeople,
    updatePeople,
    deletePeople

}