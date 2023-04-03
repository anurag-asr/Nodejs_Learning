const mongoose=require("mongoose");

const pincodeSchema=new mongoose.Schema({
    pincode:Number,
});

const pincodeModel=mongoose.model("pincode",pincodeSchema);

module.exports=pincodeModel;