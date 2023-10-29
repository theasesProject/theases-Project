
const {db}=require("../models/index")
const { Sequelize, Op } = require('sequelize')

module.exports={
    getAllCars: async function (req,res){
        try {
            const allCars= await db.Car.findAll({
              include: { model: db.CarMedia, as: 'CarMedia' }
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
                  const image= await db.CarMedia.create({
                    media:req.body.media,
                    CarId:req.body.CarId
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
        } ,

        searchCarByModel : async function (req,res){
          const model = req.query.model;
          try{
            const carSearched=await db.Car.findAll({
          
              where: {
                model: {
                  [Sequelize.Op.like]: `%${model}%`,
                },
              },
            })
          
           
          
            res.status(200).send(carSearched)
          } catch (error) {
              throw error
       }
      } ,






    }










