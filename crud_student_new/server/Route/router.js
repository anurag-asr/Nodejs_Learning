const express=require("express");
const {createStudent,fetchData,DeleteByid,UpdateData,editUser,singleData} = require("../Controller/controller")

const router = express.Router();

router.get("/",(req,res)=>{
    res.render("index",{title:"Form Details"})
})

router.post("/student",createStudent);

router.post("/data/",fetchData);

router.post("/data/:id",singleData);

router.post("/delete/:id",DeleteByid);

router.post("/edit/:id",editUser)

router.post("/update/:id",UpdateData);

module.exports={router}