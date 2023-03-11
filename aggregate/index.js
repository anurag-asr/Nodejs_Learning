const express=require("express");
const bodypaser=require("body-parser");
const config=require("dotenv").config()
const mongoose=require("mongoose");
const {router}=require("./Route/route")

const app=express();

app.use(bodypaser.json());

const PORT=process.env.PORT||5000

mongoose.connect("mongodb://127.0.0.1:27017/aggregate")
.then(()=>{console.log("Mongodb is connected")})
.catch((e)=>{console.log(console.log(e))});

app.use("/",router)

app.listen(PORT,()=>{
    console.log(`server is started at ${PORT}`)
})