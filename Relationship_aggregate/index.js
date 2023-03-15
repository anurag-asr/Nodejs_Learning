
const express=require("express");
const {connection} = require("./db")
const {router} = require("./Route/router")
const app=express();

app.use(express.json());

app.use("/",router)

app.listen(3000,async()=>{
    await connection;
    console.log(`server connected on ${3000}`)
})