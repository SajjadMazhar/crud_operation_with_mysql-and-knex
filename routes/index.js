const controller=require("../controller/controller")
const express=require("express")
const route=express.Router()


route.post("/insert",controller.insertData)

module.exports=route