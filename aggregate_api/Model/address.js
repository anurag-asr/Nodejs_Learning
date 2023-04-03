const mongoose=require("mongoose");

const addressSchema=new mongoose.Schema({
    city:{type:String},
    district:String,
    state:String,
    pincode:{type:mongoose.Schema.ObjectId,ref:"pincode"}
});

const addressModel=mongoose.model("address",addressSchema);

module.exports=addressModel;