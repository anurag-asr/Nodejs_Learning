const mongoose = require("mongoose");



const orderSchema=mongoose.Schema(
    {
        item:String,
        price:Number,
        quantity:Number
    }
)

const inventorySchema=mongoose.Schema(
    {
       sku:String,
      almonds:String,
      description:String,
      product:Number,
      instock:Number
    }
);

const classesSchema=mongoose.Schema(
    {
     title:String,
     enrollmentlist:Array,
     days:Array
    }
)

const membersSchema=mongoose.Schema(
    {
      name:String,
      joined:Date,
      status:String
    }
)

const studentSchema=mongoose.Schema({
name:String,
place:String,
age:Number
})

const weekdays=mongoose.Schema(
    {
        day:String
    }
)

const leaveDetails=mongoose.Schema({
    name: { type: mongoose.Schema.Types.ObjectId, ref: "student" },
    day:{ type: mongoose.Schema.Types.ObjectId, ref: "days" },
    date:Date
});

const leave=mongoose.model("leave",leaveDetails)
const days=mongoose.model("days",weekdays)
const stduentDetails=mongoose.model("student",studentSchema)
const order = mongoose.model("orders",orderSchema);
const inventory=mongoose.model("inventory",inventorySchema);
const classess=mongoose.model("classess",classesSchema);
const members=mongoose.model("members",membersSchema)

module.exports={
    order,inventory,classess,members,stduentDetails,days,leave
}