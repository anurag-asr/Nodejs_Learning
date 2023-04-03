
const express=require("express");

const router=express.Router();

const {student,address,pincode,aggregationRequest,populateRequest}=require("../Controller/controller")

router.post("/populate",populateRequest)

router.post("/aggregation",aggregationRequest)

router.post("/student",student)

router.post("/address",address)

router.post("/pincode",pincode)

module.exports={
    router
}