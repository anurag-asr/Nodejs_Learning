const studentModel=require("../Model/student");
const addressModel=require("../Model/address");
const pincodeModel = require("../Model/pinode");


exports.populateRequest=async(req,res)=>{
    let data=await studentModel.find()
    .populate({
        path:"address",
        select:{_id:0},
        populate:{
            path:"pincode",
            model:"pincode",
            _v:0
        }
    })
    res.send(data)
}

exports.aggregationRequest=async(req,res)=>{
    let data=await studentModel.aggregate([
        // {
        //     $match:{name:"Anurag Singh"}
        // },
        {
            $lookup:
            {
                from:"addresses",
                localField:"address",
                foreignField:"_id",
                pipeline:[
                    {
                        $lookup:{
                            from:"pincodes",
                            localField:"pincode",
                            foreignField:"_id",
                            as:"address_pincode"
                        }
                    },
                    {
                        $project:{
                            pincode:0,
                            __v:0
                        }
                    },
                    {
                        $unwind:"$address_pincode"
                    }
                ],
                
                as:"student_address"
            },
        },
        {
            $project:{
                __v:0,
                age:0,
                "student_address._id":0
            }
        },
        {
            $unwind:"$student_address"
        },
        // {
        //     $limit:2
        // }
        // {
        //     $out:"aggregation_api_result"
        // }
        // {
        //     $count:"total Document fetch"
        // }
        // {

        //     $group:{
        //         _id:{
        //             age:"$age",
        //             name:"$name",
        //             pincode:"$student_address.address_pincode.pincode",
        //             city:"$student_address.city",
        //             district:"$student_address.district",
        //         }
        //     }
        // }
        {
            $sort:{
              "Roll_num":1
            }
        },
        //For assigning to new name 
        // {
        //     $project:{
        //         new_address:"$address",
        //         rolenum:"$Roll_num",
        //         dist:"$student_address.district"
        //     }
        // }
    ])


   //Ternary Operator
//    let data1=await studentModel.aggregate([
//     {
//         $group:{
//             _id:"$age"
//         },
//     },
    // {
    //     averageAge:{
    //         "$avg":"$age"
    //     }
    // }
    // {
    //     $avg:"$student_age"
    // }
    // {
    //     maxim_quantity:{
    //         $max:"$age"
    //     }
    // }
    // {
    //     minimum_age:{
    //         $min:"$price"
    //     }
    // }
    // {
    //     firstdocument:{
    //         $first:"$age"
    //     }
    // }
    // {
    //     lastdocument:{
    //         $last:"$age"
    //     }
    // }
    // {
    //     new_data:{
    //         $addToset:"hey welcome to new data"
    //     }
    // }

    //HOW PUSH WORKS 
    // $group:
    // {
    //   _id: { day: { $dayOfYear: "$date"}, year: { $year: "$date" } },
    //   itemsSold: { $push:  { item: "$item", quantity: "$quantity" } }
    // }

    //])

//    let data2=await studentModel.aggregate([
//     {
//       $match:{
        // age:{"$gt":45}
        // price:{
        //     "$ne":1000
        // }
        //  age:{
        //     "$lt":31
        //  }
        // type_of_name:{
        //     "$type":"$name"
        // }
//       }
//     }
//    ])

let data3=await studentModel.aggregate([
    {
        $match:{
            // "$or":[
            //     {
            //         name:"Anurag Singh",price:10001
            //     },
            //     {
            //         age:{$gt:11},price:121
            //     },
            //     {
            //         address:"surat",price:10002
            //     },
            //     {

            //     }
            // ]
        }
    }
])

    res.send(data)
}

exports.student=async(req,res)=>{
    let data=await studentModel.create(req.body);
    res.send(data)
};

exports.address=async(req,res)=>{
    let data = await addressModel.create(req.body);
    res.send(data)
}

exports.pincode=async(req,res)=>{
    let data=await pincodeModel.create(req.body)
    res.send(data)
}