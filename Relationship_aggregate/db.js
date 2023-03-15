const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/lookup_aggregate").then(()=>{console.log("mongodb_connected")}).catch((err)=>{console.log(err)})

const connection=mongoose.Connection;

 module.exports={
    connection
 }