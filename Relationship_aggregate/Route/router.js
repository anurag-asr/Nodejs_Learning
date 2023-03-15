const express=require("express");
const {createOrder,createInventory,fetchOrderData,createMembers,createClassess,mergeClassessAndMembers} = require("../Controller/controller")

const router = express.Router();

router.post("/order",createOrder)

router.post("/inventory",createInventory);

router.post("/fetchorder",fetchOrderData);

router.post("/members",createMembers);

router.post("/classess",createClassess);

router.post("/mergeclassessandmembers",mergeClassessAndMembers);

// Use $lookup with $mergeObjects


module.exports={router}