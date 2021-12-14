const express=require("express")
require("dotenv").config()
const app=express()
const port=process.env.port
const home=require("./routes/index")
app.use(express.json())
app.use("/",home)

app.listen(port,()=>{
    console.log(`server runing port no ${port}`);
})