const { student, subject } = require("../Model/model");
const fs = require("fs")

exports.createStudent = async (req, res) => {
  
  let sn=req.body.subname.split(",")

  try {
    const { subname, description, firstname, lastname, email, password,gender,country } = req.body;
    const file = req.files.image;
    const ext = file.name.split('.')
    const fileName = Date.now() + "." + ext[ext.length - 1]
    const url = process.env.APPLINK + fileName;

    file.mv("Public/Upload/" + fileName, (err) => {
      if (err) {
        return res.send(err, "error in upload files");
      }
    });

    const check = (await student.findOne({ email: email })) || false;

    if (check.email == email) {
      return res.send("email is already registered");
    } 
    else {
      const sub1 = new student({
        firstname,
        lastname,
        email,
        url,
        password,
        gender,
        country,
        description,
        sub: sn,
      });
      sub1.save();
      return res.send(sub1);
    }
  } catch (err) {
    console.log(err.message);
  }
};

exports.fetchData = async (req, res) => {
  try {
    let id=req.params.id
    const data = await student
      .find()
      .populate("sub", { _id: 0, __v: 0 })
      .select({ __v: 0 });
    res.send(data);
  } 
  catch (err) {
    console.log(err);
  }
};

exports.singleData=async(req,res)=>{
  let {id}=req.params;
  try {
    const data = await student
      .find({_id:id})
      .populate("sub", { _id: 0, __v: 0 })
      .select({ __v: 0 }); 
    res.send(data);
  } 
  catch (err) {
    console.log(err);
  }
}

// exports.editUser=async(req,res)=>{
//   try{
//     const {id}=req.params;
//     let user=req.body;
//     const file = req.files.image;
//     const ext = file.name.split('.')
//     const fileName = Date.now() + "." + ext[ext.length - 1]
//     const url = process.env.APPLINK + fileName;
//     user.url=url;
//     user.sub=user.sub.split(",");

//     let x=await student.findByIdAndUpdate({_id:id},user,{new:true})
//     res.status(200).json(x)
//   }catch(error){
//     console.log(error);
//     res.status(409).json({message:error.message})
//   }
// }

// const file = req.files.image;
// const ext = file.name.split('.')
// const fileName = Date.now() + "." + ext[ext.length - 1]
// const url = process.env.APPLINK + fileName;

exports.editUser=async(req,res)=>{
  try{
    await student.findByIdAndUpdate({ _id: req.params.id })
    let oldimage =  await student.findOne({ _id: req.params.id });
    var url

   if(req.files){
    var getImge = oldimage.url;
    const removeImg = getImge.replace(process.env.APPLINK,"");
    if(oldimage.url !==""){
      fs.unlinkSync(`Public/Upload/${removeImg}`);
     }
     const file = req.files.image;
    const ext = file.name.split('.')
    const fileName = Date.now() + "." + ext[ext.length - 1]
     url = process.env.APPLINK + fileName;

    file.mv("Public/Upload/" + fileName, (err) => {
      if (err) {
        return res.send(err, "error in upload files");
      }
    });

  }else{
    url = oldimage.url;
  }

    var data = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email:req.body.email,
      password:req.body.password,
      url:url,
      country:req.body.country,
      gender:req.body.gender,
      sub:req.body.sub.split(","),
    }
  
    let result = await student.findByIdAndUpdate({ _id: req.params.id }, data, {new: true});
      res.send(result);
  }
  catch(error){

  }
}

exports.DeleteByid = async (req, res) => {
  try {
    const result = await student.findByIdAndDelete(req.params.id);
    var getImge = result.url
    const removeImg = getImge.replace(process.env.APPLINK, "");
    fs.unlinkSync(`Public/Upload/${removeImg}`)
    res.send(result);
  } catch (err) {
    res.send(err)
  }
}

// try {
//   const result = await project.findByIdAndDelete({ _id: req.params.id });
//   var getImge = result.icon;
//   const removeImg = getImge.replace(process.env.APPLINK, "");
//   fs.unlinkSync(`Public/Upload/${removeImg}`);
//   res.send(result);
// } catch (err) {
//   res.send(err);
// }
// };

exports.UpdateData = async (req, res) => {
  try {
    const {
      sub_name,
      description,
      firstname,
      lastname,
      email,
      password,
    } = req.body;
    const obj = await student.findById(req.params.id);
    obj.firstname = firstname;
    obj.lastname = lastname;
    obj.email = email;
    obj.password = password;
    obj.sub.sub_name = sub_name;
    obj.sub.description = description;
    await obj.save();
    res.send(obj);
  } catch (err) {
    res.send(err);
  }
};
