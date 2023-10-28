const sequalize =require('sequelize')
const {db}=require("../models/index")


module.exports={
    getAllCars: async function (req,res){
        try {
            const allCars= await db.Car.findAll({
             include: { all: true, nested: true }
            })
 
            res.status(200).send(allCars)
        } catch (error) {
            throw error
        
        }
     },
  

     
     CreateCar:async function (req,res){
        try{
          const newCar=await db.Car.create({
        
            
                model: req.body.model,
                brand: req.body.brand,
                price: req.body.price,
                period: req.body.period,
                status: "available",
                horsePower: req.body.horse,
                typeOfFuel: req.body.typeOfFuel,
                description: req.body.description,
                warrantyInsurance: req.body.warrantyInsurance,
                deposit: req.body.deposit,
                acceptation: "pending"
              
        
          })
        
          res.status(200).send(newCar)
        } catch (error) {
            throw error
        
        }
        
             },
             createImage: async function (req,res){
              try {
                  const image= await db.MediaCar.create({
                    media:req.body.media,
                    CardId:req.body.CardId
                  })
       
                  res.status(200).send(image)
              } catch (error) {
                  throw error
              
              }
           },
           filterCarByBrand: async function (req,res){
            try{
              const carByBrand=await db.Car.findAll({
            
                where:{brand:req.params.brand}
            
              })
            
              res.status(200).send(carByBrand)
            } catch (error) {
                throw error
         }
        } 




    }










