const mongoose = require("mongoose")
const url = "mongodb://127.0.0.1:27017/users"
mongoose.connect(url,{useNewUrlParser:true})
const connect = mongoose.connection

module.exports={
    connect
}