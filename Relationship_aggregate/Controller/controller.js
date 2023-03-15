// const { ReturnDocument } = require("mongodb")
const {order,inventory,classess,members} =require("../Model/model")

exports.createOrder=async(req,res)=>{
const data=await order.create(
    {"item" : "almonds", "price" : 12, "quantity" : 2 },
    {"item" : "pecans", "price" : 20, "quantity" : 1 },
)
return res.json(data)
}

exports.createInventory=async(req,res)=>{
const data=await inventory.create(
    {"sku" : "almonds", "description": "product 1", "instock" : 120 },
    {"sku" : "bread", "description": "product 2", "instock" : 80 },
    {"sku" : "cashews", "description": "product 3", "instock" : 60 },
    {"sku" : "pecans", "description": "product 4", "instock" : 70 },
    {"sku": null, "description": "Incomplete" },
)
return res.json(data)
}

// Perform a Single Equality Join with $looku
exports.fetchOrderData=async(req,res)=>{
    const data=await order.aggregate([
        {
            $lookup:
              {
                from: "inventories",
                localField: "item",
                foreignField: "sku",
                as: "inventory_docs"
              }
         }
    ]);
    return res.json({count:data.length,data})
};

// Use $lookup with an Array
exports.createMembers=async(req,res)=>{
    const data=await members.create(
   {name: "artie", joined: new Date("2016-05-01"), status: "A" },
   {name: "giraffe", joined: new Date("2017-05-01"), status: "D" },
   {name: "giraffe1", joined: new Date("2017-10-01"), status: "A" },
   {name: "panda", joined: new Date("2018-10-11"), status: "A" },
   {name: "pandabear", joined: new Date("2018-12-01"), status: "A" },
   {name: "giraffe2", joined: new Date("2018-12-01"), status: "D" }
    );
    return res.json(data)
};

exports.createClassess=async(req,res)=>{
    const data = await classess.create(
        {title: "Reading is ...", enrollmentlist: [ "giraffe2", "pandabear", "artie" ], days: ["M", "W", "F"] },
        {title: "But Writing ...", enrollmentlist: [ "giraffe1", "artie" ], days: ["T", "F"] }
    );
    res.json(data)
}

exports.mergeClassessAndMembers=async(req,res)=>{
    const data = await classess.aggregate(
    [
        {
            $lookup:
            {
                from:"members",
                localField:"enrollmentlist",
                foreignField:"name",
                as:"enrolle_Info"
            }
        }
    ]
    );
    res.json(data);
}

// use $lookup with $mergeObjects