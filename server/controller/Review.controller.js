const {db}=require("../models/index")
const { Sequelize, Op } = require('sequelize')
module.exports={
    BringAllReview:async(req,res,next)=>{
        try {
            const task = await db.Review.findAll()
            res.status(200).send(task)     
        } catch (err) {
            next(err)
        }
    },
    MakeReview:async(req,res,next)=>{
        try {
            const task = await db.Review.create(req.body)
            res.json(task)
        } catch (err) {
            next(err)
        }
    }
}