const mongoose=require("mongoose");

const studentschema=new mongoose.Schema({
    name:{type:String,require},
    age:Number,
    Role_num:Number,
    address:{type:mongoose.Schema.ObjectId,ref:"address"}
});

const studentModel=mongoose.model("student",studentschema);

module.exports=studentModel