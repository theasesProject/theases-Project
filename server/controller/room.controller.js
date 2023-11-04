const {db} = require("../models/index");
const { Sequelize, Op } = require("sequelize");

module.exports.makeRoom = async (req,res)=>{
    try{
        const secondUser = await db.User.findOne({
            where:{
                id:req.body.user2
            }
        })
        const added = await db.RoomChat.create({
            UserId:req.body.UserID,
            name:secondUser.userName,
            avatarUrl:secondUser.avatar,
            user2:req.body.user2,
            UserId:req.body.UserId
        })
        res.json(added)
    } catch(err){
        throw err
    }
}

module.exports.getAll = async (req, res)=>{
    try{
        const all = await db.RoomChat.findAll({
            where:{
                UserId:req.params.id
            }
        })
        res.json(all)
    } catch(err){
        throw err
    }
}