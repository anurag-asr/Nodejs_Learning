const express=require("express");
const app = express();
const {user} =require("./Route/route");
const {connect}=require("./config/config")
const {config}=require("dotenv");


config();

const PORT=process.env.PORT||3000;
app.use(express.json())
app.use("/user",user)

const server = async()=>{
 try{
  await connect
  app.listen(PORT,()=>{
    console.log(`PORT SUCCESSFULLY RUNNING ON ${PORT}`);
  })
 }
 catch(err){
 console.log(err)
 }
}
server()