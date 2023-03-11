const express=require("express")
const app=express();
const {connect}=require("./config/config")
const {router}=require("./Route/route")
// const bodyparser=require("body-parser")

app.use(express.json());
// app.use(bodyparser.json())
// app.use(bodyparse.urlencoded({extended:false})) its means not allowed the data is a method inbuilt in express to recognize the incoming Request Object as strings or arrays.
//  Recommende to use body parse bcz it is build bye developer who developed express
app.use('/user',router);


app.listen(3000, async() => {
 try{
    await connect.on("open",()=>{console.log("server connected")})
 }
 catch(err){throw err}
  console.log(`Nodejs server started on port ${3000}`);
});



// New address instance...


// Insertion en base de donnée de la collection `address`
// address.save()
//   .then((newAddress) => {

//     const student = new studentModel({
//       firstName: "Sofiane",
//       surname: "ABDEDOU",
//       address: newAddress._id,
//     });
//     student.save().then(console.log).catch(console.log);
//   })
//   .catch(console.error);

// studentModel
//   .findOne({ _id: "6164a92d12208e1df342f8ea" })
//   .populate("address")
//   .then(console.log)
//   .catch(console.error);

// // Insertion jointure en base de donnée de la collection `student`

// Connection à MongoDB
