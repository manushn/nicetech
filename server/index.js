const express = require("express");
const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();  // Initialize express properly
const port = 3000;  // Use 'port' consistently
const cors = require('cors');
const bodyParser = require('body-parser');
const Loginroute= require('./autroute/login.js');
const Staffadd=require("./autroute/adminroute.js");
const PasswordCreater=require("./autroute/createpassword.js");
const Studentmanage=require("./autroute/studentadminroute.js");

const uri = "mongodb+srv://manush12:Manushnicetech1@manush-database.scvtt.mongodb.net/?retryWrites=true&w=majority&appName=manush-database";


app.use(cors());
app.use(bodyParser.json());



mongoose.connect('mongodb://localhost:27017/NICETECH',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(()=> console.log("Mongodb connected"))
    .catch((error)=>console.log("error is ",error));


app.get('/', (req, res) => {
    res.send('Hello, Manus! Your Express server is working.');
  });
app.use('/',Loginroute);
app.use('/',PasswordCreater);
app.use('/admin',Staffadd);
app.use('/admin',Studentmanage);

app.listen(port,'0.0.0.0', (error) => {  // Use 'port' here
    if (error) 
        console.log(error);
    else
        console.log(`Server is running on port ${port}`);
});
