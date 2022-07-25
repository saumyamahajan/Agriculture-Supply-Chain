const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config")
var fileupload = require("express-fileupload");
const multer = require('multer');


const userRoute = require("./routes/userRoute");
const farmerRoute = require("./routes/farmerRoute");
const activityRoute = require("./routes/activityRoute");
const materialRoute = require("./routes/materialRoute");
const peopleRoute = require("./routes/peopleRoute");
const assetRoute = require("./routes/assetRoute");
const materialConsumedRoute = require("./routes/materialConsumedRoute");



const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
//app.use(fileupload());
//var upload = multer({ dest: 'uploads/' });

app.use(bodyParser.urlencoded({ extended: true }));


app.use("/api/user", userRoute.routes);
app.use("/api/farmer", farmerRoute.routes);
app.use("/api/activity", activityRoute.routes);
app.use("/api/material", materialRoute.routes);
app.use("/api/activity/people", peopleRoute.routes);
app.use("/api/activity/asset", assetRoute.routes);
app.use("/api/activity/materialConsumed", materialConsumedRoute.routes);

const port = 3001;

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, './public/uploads/');
//       //  cb(null, 'images');
//     },
//     filename: function(req, file, cb) {   
//        // cb(null, 'aa' + '-' + Date.now() + path.extname(file.originalname));
//        //const newFilename = file.originalname;
//               cb(null, file.originalname);
//             //cb(null, file.fieldname + '-' + Date.now())
//     }
// });

 
//   var upload = multer({ storage: storage }).single('activityProof');
// app.post('/upload', upload, function (req, res) {
//     //app.post('/upload', function (req, res) {
//     // req.file is the name of your file in the form above, here 'uploaded_file'
//     // req.body will hold the text fields, if there were any 
//     console.log("inside")
//    console.log(req.file, req.body)
//     res.status(201).json({ message: "activity uploaded successfully" });
//  })





app.listen(port, () => {
    console.log("Service endpoint= %s", port);
    mongoose.connect(config.DB_URI).then(() =>
        console.log("db connected succesfully")
    )
    
});