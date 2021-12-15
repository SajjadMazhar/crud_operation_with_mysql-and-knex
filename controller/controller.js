const knex=require("../config/db")

// const insertData=(req,res)=>{

//     knex("user").insert(req.body).then((data)=>{
//         console.log("data inserted");
//         res.send({massage:"data insert successfully"})
//     }).catch(err=>{
//         console.log(err);
//         res.send(err.massage)
//     })
// }

exports.showData = (req, res)=>{
    knex("user").then((rowData)=>{
        res.send(rowData)
    }).catch((err)=>{
        console.log(err)
        res.send({"status":"failed"})
    })
}

exports.insertData = async (req, res)=>{
    try{
        let data = await knex("user")
        let dataToInsert = await req.body
        let exists = false;
        for (let d of data){
            if (d.name == dataToInsert.name){
                exists = true
            }
        }
        if (!exists){
            await knex("user").insert(dataToInsert)
            res.send({status:"inserted"})
        }else{
            res.send("duplicate entries not allowed!")
        }

    }catch(err){
        console.log("some error occured: ",err.message)
        res.send({status:"failed"})
    }

}

exports.updateData = async(req, res)=>{
    let id = req.params.id;
    await knex("user").where({id}).update(req.body);
    res.send("updated");

}

exports.deleteData = async(req, res)=>{
    try{
        let id = await req.params.id;
        let deleted = await knex("user").where({id}).del();
        console.log(deleted);
        res.send({status:"deleted"});

    }catch(err){
        res.send({status:"data does not exist."});
    }
}

// module.exports={insertData}