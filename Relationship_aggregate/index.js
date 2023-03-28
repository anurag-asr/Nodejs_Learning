
const express=require("express");
const {connection} = require("./db")
const {router} = require("./Route/router")
const app=express();
const upload=require("express-fileupload");
const cors=require("cors")

app.use(express.json());
app.use(cors());
app.use(upload())

app.use("/",router)

app.listen(8000,async()=>{
    await connection;
    console.log(`server connected on ${8000}`)
})