const sequalize =require('sequelize')
const {db}=require("../models/index")


module.exports={
    getAllCars: async function (req,res){
        try {
            const allCars= await db.Car.findAll({
             include: { all: true, nested: true }
            })
 
            res.status(200).send(allBrand)
        } catch (error) {
            throw error
        
        }
     },
     getCarByBrand:async function (req,res){

  const carByBrand=await db.Car.findOne({

    where:{brand:req.params.brand}
    
  })

     }














}