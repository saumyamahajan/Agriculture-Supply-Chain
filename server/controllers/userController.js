const userModel = require("../models/user")
const ObjectId  = require("mongodb").ObjectId;

const getAllUsers = async (req, res, next) => {
    try {
        console.log("All Users func");
        userModel.find({}).exec(function (err, result){
            if(err) throw err
            else res.status(200).json(result);
        })

    } catch (error) {
       res.status(400).json({ message: error.message });
      }

};

const getUser = async (req, res, next) => {
    try {
        //const userName = req.body.userName;
        const email = req.body.email;
        const password = req.body.password;
        console.log(" email : " + email + " , pwd : " + password);
        userModel.find({'email' : email , 'password' : password}).exec(function (err, result){
            if(err) throw err
            else {
                console.log("result:"+result);
            //console.log("result1:"+result[0].email);
            //console.log("result2:"+result.email)
             //if(result!=[])
                res.status(200).json(result);
              //  else
              //  res.status(200).json({"msg":"incorrect login or pwd"});
            }
        })

    } catch (error) {
        console.log("error:");
        res.status(400).json({ message: error.message });
      }

};

const createUser = function(user) {
    return userModel.create(user).then(docUser => {
      console.log("\n>> Created user:\n", docUser);
      return docUser;
    });
  };

const addUser = async  (req, res, next) => {
    try {
        console.log("Adding new user");
        const data = req.body;

        var user = await createUser({
            // userName : "Loki",  
            // userType : "admin",
            // email : "shdjxsh@gmail.com", 
            // passward : "pwd"
            userName : req.body.userName,  
            userType : req.body.userType,
            email : req.body.email, 
            password : req.body.password
        });
        console.log("\n>> user:\n", user); 
        res.status(201).json({ message: "user saved successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
      }

};

const updateUser = async  (req, res, next) => {
    try {
        const userId = req.params.id;
        console.log("updated activity = %s", userId);
        userModel.findOneAndUpdate({'_id' : ObjectId(userId)} , 
        {
            $set : {
                // userName : "updated Loki",  
                // userType : "updated admin",
                // email : "shdjxsh@gmail.com", 
                // passward : "pwd"
                userName : req.body.userName,  
                userType : req.body.userType,
                email : req.body.email, 
                passward : req.body.passward
            }
        }, 
        function(err, result){
            if (err) throw err;
            else res.status(200).json({ message: "1 user updated" });
        })

    } catch (error) {
        res.status(400).json({ message: error.message });
      }

};

const deleteUser = async  (req, res, next) => {
    try {
        const userId = req.params.id;
        console.log("deleted user = %s", userId);
        userModel.deleteOne({'_id' : ObjectId(userId)} , function(err, result){
            if (err) throw err;
            else res.status(200).json({ message: "1 user deleted" });
        })
        
    } catch (error) {
        res.status(400).json({ message: error.message });
      }

};

module.exports = {
    getAllUsers, 
    getUser, 
    addUser, 
    updateUser, 
    deleteUser
}