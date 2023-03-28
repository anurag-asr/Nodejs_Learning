
const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  sub_name: String,
  description: String,
});

const studentSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email:String,
    password:String,
    url:String,
    country:String,
    gender:String,
    sub:{type:Array},
  });
  
const student = mongoose.model("students", studentSchema);

const subject = mongoose.model("subject", subjectSchema);

module.exports = {
    student,subject
}