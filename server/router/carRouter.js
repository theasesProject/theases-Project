const {getCarByBrand,getAllCars,CreateCar,createImage}=require('../controller/CarController')
const express = require('express')
const carRouter = express.Router()

carRouter.get('/allCars',getAllCars)
carRouter.get("/byBrand/:brand",getCarByBrand)
carRouter.post('/newCar',CreateCar)
carRouter.post("/imageCar",createImage)


module.exports=carRouter



