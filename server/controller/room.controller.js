const {db} = require("../models/index");
const { Sequelize, Op } = require("sequelize");

module.exports.makeRoom = async (req,res)=>{
    try{
        const added = await db.RoomChat.create(req.body)
        res.json(added)
    } catch(err){
        throw err
    }
}

module.exports.getAll = async (req, res)=>{
    try{
        const all = await db.RoomChat.findAll({
            where:{
                id:req.params.id
            }
        })
    } catch(err){
        throw err
    }
}