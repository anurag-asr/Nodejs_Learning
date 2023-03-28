const express=require("express");
const {createStudent,fetchData,DeleteByid,UpdateData,editUser,singleData} = require("../Controller/controller");


const router = express.Router();

const joi = require("joi");

const validationMiddleware=(req,res,next)=>{

    const schema=joi.object().keys({
        firstname:joi.string().min(3).required(),
        lastname:joi.string().min(3).required(),
        email:joi.string().email().required(),
        password:joi.string().min(3).required(),
        gender:joi.string().required(),
        subname:joi.string().required(),
        country:joi.string().required(),
    })

    const {error}=schema.validate(req.body,{abortEarly:false})
    if(error){
        const {details}=error;
        console.log(details)
        res.status(200).json({error:details})
    }
    else{next()}
}

router.get("/",(req,res)=>{
    res.render("index",{title:"Form Details"})
})

router.post("/student",validationMiddleware,createStudent);

router.post("/data/",fetchData);

router.post("/data/:id",singleData);

router.post("/delete/:id",DeleteByid);

router.post("/edit/:id",editUser)

router.post("/update",UpdateData);

module.exports={router}



// ################################################################# Joe Validation #################################################################

// const validationMiddleware=(req,res,next)=>{
//     const schema=joe.object().keys(
//         {
//             name:joi.string().required(),
//             password:joi.string().required(),
//             search:joi.string().optional(),
//             category:joe.string().optional.valid("car","bike","bus"),
//             amount:joi.number().integer().min(1).max(20),
//             age:joi.number().when('name',{is:'test',then:joe.required(),otherwise:joi.optional()}),
//             item:joi.object().keys({
//                 id:joi.number().required(),
//                 name:joi.string().optional(),
//             }),
//             confirm_password:joi.string().valid(joi.ref('password')).required(),
//             number:joi.array().min(joi.ref('limit')).required()
//         }).unknown(false)
//         const {error}=schema.validate(req.body,{abortEarly:false})
//         if(error){
//             const {details}=error
//             res.status(200).json({error:details})
//         }
//         else{next()}
// }


// app.post("/add-user",validationMiddleware,async(req,res)=>{
//     let result={
//         id:12,
//         name:"Test Demo"
//     }
//     res.status(200).json(req.body)
// })
