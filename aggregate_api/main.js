const express=require("express");
const upload=require("express-fileupload");
const app=express();

const cors=require("cors")

app.use(upload());
const {router}=require("./Router/routes")
const {connection}=require("./db");


app.use(express.json());
app.use(cors());
app.use("/",router)


app.listen(8000,async(req,res)=>{
await connection    
console.log(`connection established on port 8000`)
})