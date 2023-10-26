const {getCarByBrand,getAllCars}=require('../controller/CarController')
const express = require('express')
const carRouter = express.Router()

carRouter.get('/allCars',getAllCars)
carRouter.get("/byBrand/:brand",getCarByBrand)


module.exports=carRouter



