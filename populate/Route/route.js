const express = require("express");
let router = express.Router();

const addressModel = require("../Controller/addressModel");
const studentModel = require("../Controller/studentModel");

router.get("/", async(req, res) => {
try{
    const data = await studentModel.find().populate("address")
    // .then(p=> res.send("successfull registered"))
    // .catch(error=>console.log(error));
    res.send(data)
}
catch(err){throw err}
});


router.post("/", async (req, res) => {
  try {
    const { streetName, streetNumber, postCode, city } = req.body;
    const address = new addressModel({
      streetName,
      streetNumber,
      postCode,
      city,
    });

    address.save()
      .then((newAddress) => {
    const {firstName,surname}=req.body
    const student = new studentModel({
      firstName,
      surname,
      address: newAddress._id,
    });
    student.save().then(res.send(student)).catch(console.log);
  })
  .catch(console.error);


  } catch (err) {
    throw err;
  }
});

module.exports = {
  router,
};
