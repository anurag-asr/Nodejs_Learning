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

const order = mongoose.model("orders",orderSchema);
const inventory=mongoose.model("inventory",inventorySchema);
const classess=mongoose.model("classess",classesSchema);
const members=mongoose.model("members",membersSchema)

module.exports={
    order,inventory,classess,members
}