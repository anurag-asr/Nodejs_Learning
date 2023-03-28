const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/student_sheet").then(()=>{console.log("mongodb_connected")}).catch((err)=>{console.log(err)})

const db=mongoose.connection;
db.on("error",(error)=>{console.log(error)});
db.once("open",()=>{
   console.log("connected to the database")
});

 module.exports={
    db
 }