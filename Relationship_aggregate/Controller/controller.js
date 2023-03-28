// const { ReturnDocument } = require("mongodb")
const { default: mongoose } = require("mongoose");
const {order,inventory,classess,members,stduentDetails,days,leave} =require("../Model/model")

exports.getstudents=async(req,res)=>{
    const {id}=req.params;
    let data=await stduentDetails.aggregate([
        {
            $lookup:{
                from: "leaves",
                localField: "_id",
                foreignField: "name",
                pipeline:[{$lookup:{
                    from:'days',
                    localField:'day',
                    foreignField:'_id',
                    // pipeline:[{$project:{day:1,_id:0}}],
                    as:'day'
                }},
                // {$unwind:'$day'},
                // {$project:{_id:1,'day':'$day.day',date:1}}
            ],
                as: "leave"
            }
        },
        {
            $project:{_id:1,name:1,place:1,age:1,leave:1}
        }
    ])
    // .exec()  
    // let x=await leave.populate(data, {path: 'leaves_data.day'})
    res.send(data)

}

exports.leaveDetails=async(req,res)=>{
    const name_id=req.body.name_id;
    const day_id=req.body.day_id;
    let name=await stduentDetails.findById(name_id);
    let day=await days.findById(day_id)
    let date=new Date();
    let obj={
        name:name._id,day:day._id,date
    };
    const data=await leave.create(obj)
    res.send(data)
}

exports.studentCreate=async(req,res)=>{
    const data=await stduentDetails.create(req.body)
    res.send(req.body)
}


exports.createDays=async(req,res)=>{
    const data=await days.create(
        {"day" : "monday"},
        {"day" : "tuesday"},
        {"day" : "wednesday"},
        {"day" : "thursday"},
        {"day" : "friday"},
        {"day" : "satuday"},
        {"day" : "sunday"}
    )
    res.send(data)
}





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
