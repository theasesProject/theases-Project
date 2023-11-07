const {db } = require("../models/index");
const Message = db.Message

module.exports.add = async (req,res)=>{
    try{
        const added = await Message.create(req.body)
        res.json(added)
    } catch(e){
        throw err
    }
}

module.exports.getMessages = async (req,res)=>{
    try{
        const all = await Message.findAll({
            where:{
                roomId:req.params.id
            }
        })
        res.json(all)
    } catch(e){
        throw err
    }
}