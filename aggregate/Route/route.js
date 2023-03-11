const express=require("express");
let router = express.Router();
const {create,matchOne,findAll,createMany,pagination}=require("../Controller/controller")

router.route("/user").get(findAll).post(create);

router.get("/alluser",findAll)

router.post("/post",create)

router.post("/createmany",createMany);

router.post("/gt",matchOne);

router.post("/pagination",pagination)

router.post("/")

module.exports = {
    router,
  };
  