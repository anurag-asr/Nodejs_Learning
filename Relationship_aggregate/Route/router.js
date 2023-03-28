const express=require("express");
const {getstudents,leaveDetails,createDays,studentCreate,createOrder,createInventory,fetchOrderData,createMembers,createClassess,mergeClassessAndMembers} = require("../Controller/controller")

const router = express.Router();



router.post("/data/:id",getstudents)

router.post("/leave",leaveDetails)

router.post("/student",studentCreate)

router.post("/days",createDays)

// #################################################### Student #########################################################################

router.post("/order",createOrder)

router.post("/inventory",createInventory);

router.post("/fetchorder",fetchOrderData);

router.post("/members",createMembers);

router.post("/classess",createClassess);

router.post("/mergeclassessandmembers",mergeClassessAndMembers);

module.exports={router}