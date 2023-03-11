const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    name:String,
    price:Number,
    address:String
})

const studentschema=mongoose.Schema({
    name:String,
    age:Number,
    id:Number,
    sec:String,
    subject:{type:Array,required:true}
});

const user=mongoose.model("users",userSchema);
const student = mongoose.model("student",studentschema)

module.exports={
    user,student
}