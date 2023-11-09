const {
  filterCarByBrand,
  getAllCars,
  CreateCar,
  createImage,
  searchCarByModel,
  filtredCar,
  searchCarById,
  deletedAgencyCar,
  getAllCarsByAgencyId,
} = require("../controller/CarController");
const express = require("express");
const carRouter = express.Router();

carRouter.get("/allCars", getAllCars);
carRouter.post("/byBrand", filterCarByBrand);
carRouter.post("/newCar", CreateCar);
carRouter.post("/imageCar", createImage);
carRouter.get("/searchName/:model", searchCarByModel);
carRouter.post("/filtredCar", filtredCar);
carRouter.get("/carById/:id", searchCarById);
carRouter.delete("/deletedCar/:id/:AgencyId", deletedAgencyCar);
carRouter.get("/allCarByAgency/:AgencyId", getAllCarsByAgencyId);
module.exports = carRouter;
