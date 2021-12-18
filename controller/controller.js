const knex=require("../config/db")
const joi = require("joi")

// const insertData=(req,res)=>{

//     knex("user").insert(req.body).then((data)=>{
//         console.log("data inserted");
//         res.send({massage:"data insert successfully"})
//     }).catch(err=>{
//         console.log(err);
//         res.send(err.massage)
//     })
// }
const validationCheck = (dataToInsert)=>{
    const vSchema = joi.object({
        name:joi.string().min(3).max(30).required(),
        age:joi.number().min(6).max(100).required(),
        gender:joi.string().required()
    })


        const schemaValidation = vSchema.validate(dataToInsert)
        if(schemaValidation.error){
            return [false, schemaValidation.error.message];
        }
        return [true, schemaValidation.value];
}

exports.showData = (req, res)=>{
    knex("user").then((rowData)=>{
        res.send(rowData)
    }).catch((err)=>{
        console.log(err);
        res.send({"status":"failed"});
    })
    
}

exports.insertData = async (req, res)=>{
    try{
        let data = await knex("user").where({name:`${req.body.name}`})
        let dataToInsert = await req.body
        if(data.length > 0){
            res.send("data is already there!")
        }else{
            let isValid = validationCheck(dataToInsert)
            if(isValid[0]){
                await knex("user").insert(isValid[1]);
                res.send({status:"inserted"});
            }else{
                res.status(500).json({message: `Some error while validation: ${isValid[1]}`})
            }
        }
    }catch(err){
        console.log("some error occured: ",err.message);
        res.send({status:"failed"});
    }
}

exports.updateData = async(req, res)=>{
    let id = req.params.id;
    let isValid = await validationCheck(req.body)
    if(isValid[0]){
        await knex("user").where({id}).update(isValid[1]);
        res.send("updated");
    }else{
        res.status(500).json({message: `Some error while validation: ${isValid[1]}`})
    }

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