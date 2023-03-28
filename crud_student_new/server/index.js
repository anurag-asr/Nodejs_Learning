require("dotenv").config(".env");
// require("dotend").config()
const express=require("express");
const {connection} = require("./db");
const path = require("path")
const {router} = require("./Route/router");
const upload=require("express-fileupload");
const cors = require('cors');

// const PORT=process.env.PORT||3000

const app=express();

// Middlewares
app.use(upload())
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.set("view engine","ejs")
app.use(express.static(path.join(__dirname, 'Public')))
app.use(cors());

app.use("/",router)

app.listen(3001,async()=>{
    console.log(`server connected on ${3001}`)
})