
const express=require("express");
// const {connection} = require("./db");
const router = require("./Route/router");

const app=express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.set("view engine","ejs")
// app.use(express.static(path.join(__dirname, 'Public')))

app.use("/",router)

app.listen(3002,async()=>{
    console.log(`server connected on ${3001}`)
})