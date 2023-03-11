const express=require("express");
const user=express.Router();
const users = require("../Controller/userModel")



user.get("/",async(req,res)=>{
try{
  const user =  await users.find();
    res.json(user)
}
catch(err){
console.log(err)
}
})

user.get("/:id",async(req,res)=>{
    try{
        const user = await users.findById(req.params.id);
        res.send(user)
    }
    catch(err){
        console.log(err)
    }
})

user.post("/",async(req,res)=>{try{
    const user=new users({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email
      })
        const a1=await user.save()
        res.send(a1) 
    }
    catch(err){res.send("error")}
})

user.post("/patch/:id",async(req,res)=>{
try{
    const obj=await users.findById(req.params.id);
   if (req.body.first_name && req.body.last_name && req.body.email){obj.first_name=req.body.first_name,obj.last_name=req.body.last_name,obj.email=req.body.email}
   if (req.body.first_name && req.body.last_name){obj.first_name=req.body.first_name,obj.last_name=req.body.last_name}
   if (req.body.last_name && req.body.email){obj.last_name=req.body.last_name,obj.email=req.body.email}
   if (req.body.first_name  && req.body.email){obj.first_name=req.body.first_name,obj.email=req.body.email}
   if(req.body.first_name){obj.first_name=req.body.first_name}
   if(req.body.last_name){obj.last_name=req.body.last_name}
   if(req.body.email){obj.email=req.body.email}
   else{
    res.send("Nothing to modify please enter some details")
   }
   
   await obj.save();
   res.send(obj)
}
catch(err){
    res.send(err)
}
})

user.post("/delete/:id",async(req,res)=>{
    try{
     const obj= await users.findByIdAndDelete(req.params.id)
     res.status(200)
     res.send("deleting done")
    }
    catch(err){
        res.send("Error")
    }
})

module.exports={
    user
}