const {user,student}=require("../Model/model");


exports.findAll=async(req,res)=>{
const data=await user.find();
res.json({count:data.length,data})
}

exports.create=async(req,res)=>{
    const {name,price,address}=req.body;
    const data=await user.create({
        name,price,address
    });
    return res.json(data)
};

exports.createMany=async(req,res)=>{
    const data=await user.create(
        {
            name: "Copy",
            address: "Pokhara",
            price: 300,
          },
          {
            name: "Pen",
            address: "Chitwan",
            price: 430,
          },
          {
            name: "Laptop",
            address: "Ktm",
            price: 280,
          },
          {
            name: "Mobile",
            address: "Chitwan",
            price: 850,
          },
    )
    return res.send(data)
}

exports.matchOne=async(req,res)=>{
    const data=await user.aggregate([
        {
            $match:{price:{$gt:300}}
        }
    ])
    return res.json({counts:data.length,data})
}

exports.pagination=async(req,res)=>{
    const {limit,skip,price}=req.body;
    const data=await user.aggregate(
        [
            {
                $match:{price:{$gt:+price||200}}
            },
            {
               $skip:skip||2
            },
            {
                $limit:limit||2
            },
            {
                $sort:{name:-1}
            }
        ]
    )
    return res.json(data)
}

// name:"natasa",
// age:19,
// id:1,
// sec:B,
// "subject":[
//     "physics","maths","chemistry","biology"
// ]


exports.studentCreate=async(req,res)=>{
    const {name,age,id,sec,subject}=req.body;

 const data=await student.create(
    {
        name,age,id,sec,subject
    }
 )
 return res.json(data)
}





