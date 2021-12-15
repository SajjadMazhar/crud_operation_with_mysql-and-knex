const controller=require("../controller/controller")
const express=require("express")
const route=express.Router()


route.get("/data", controller.showData)
route.post("/insert",controller.insertData)
route.put("/update/:id", controller.updateData)
route.delete("/delete/:id", controller.deleteData)

module.exports=route