const knex=require("../config/db")

insertData=(req,res)=>{
    knex("user").insert(req.body).then((data)=>{
        console.log("data insert");
        res.send({massage:"data insert successfully"})
    }).catch(err=>{
        console.log(err);
        res.send(err.massage)
    })
}

module.exports={insertData}