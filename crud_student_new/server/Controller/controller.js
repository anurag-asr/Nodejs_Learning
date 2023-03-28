const { student, subject } = require("../Model/model");

exports.createStudent = async (req, res) => {
  try {
    const { subname, description, firstname, lastname, email, password } = req.body;
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
      res.send("email registered");
    } 
    else {
      var subid = [];
      let sub=[]
  
      for(var i=0;i<subname.length;i++)
      {
       let obj={};
       obj["subname"]=subname[i];
       obj["description"]=description[i];
       sub.push(obj)
      }

      sub.map(async (val, index) => {
        const data = new subject({
          sub_name: val.sub_name,
          description: val.description,
        });
        subid.push(data._id);
        await data.save();
      });

      const sub1 = new student({
        firstname,
        lastname,
        email,
        url,
        password,
        sub: subid,
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

exports.editUser=async(req,res)=>{
  const {id}=req.params;
  let user=req.body;
  const editUser = await  student(user)
  // console.log(editUser,id)

  try{
 let x=await student.updateOne({_id:id},editUser)
 console.log(x)
 res.status(200).json(x)
  }
  catch(error){
res.status(409).json({message:error.message})
  }

}

exports.DeleteByid = async (req, res) => {
  try {
    const obj = await student.findByIdAndDelete(req.params.id);
    res.status(200);
    res.send("deleting done");
  } catch (err) {
    res.send("Error");
  }
}

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
