const {filterCarByBrand,getAllCars,CreateCar,createImage,searchCarByModel}=require('../controller/CarController')
const express = require('express')
const carRouter = express.Router()

carRouter.get('/allCars',getAllCars)
carRouter.get("/byBrand/:brand",filterCarByBrand)
carRouter.post('/newCar',CreateCar)
carRouter.post("/imageCar",createImage)
carRouter.get('/searchName/:model',searchCarByModel)



module.exports=carRouter



