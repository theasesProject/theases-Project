const { db } = require("../models/index");
const { Sequelize, Op } = require("sequelize");
const { all } = require("../router/carRouter");

module.exports = {
  getAllCars: async function (req, res) {
    try {
      const allCars = await db.Car.findAll({
        include: [
          // { model: db.Media, as: "Media" },
          { model: db.Agency, as: "Agency" },
        ],
      });

      res.status(200).send(allCars);
    } catch (error) {
      res.json(error);
    }
  },

  CreateCar: async function (req, res) {
    try {
      const newCar = await db.Car.create({
        model: req.body.model,
        brand: req.body.brand,
        price: req.body.price,
        priceWeekly: req.body.priceWeekly,
        priceMonthly: req.body.priceMonthly,
        status: "available",
        horsePower: req.body.horse,
        typeOfFuel: req.body.typeOfFuel,
        description: req.body.description,
        warrantyInsurance: req.body.warrantyInsurance,
        deposit: req.body.deposit,
        acceptation: "pending",
        typevehicle: req.body.typevehicle,
        characteristics: req.body.characteristics,
        AgencyId: req.body.AgencyId,
      });

      res.status(200).send(newCar);
    } catch (error) {
      res.json(error);
    }
  },
  createImage: async function (req, res) {
    try {
      const image = await db.Media.create({
        media: req.body.media,
        CarId: req.body.CarId,
      });

      res.status(200).send(image);
    } catch (error) {
      res.json(error);
    }
  },
  filterCarByBrand: async function (req, res) {
    try {
      const carByBrand = await db.Car.findAll({
        where: { brand: req.body.brand },
        include: { model: db.Media, as: "Media" },
      });

      res.status(200).send(carByBrand);
    } catch (error) {
      res.json(error);
    }
  },

  searchCarByModel: async function (req, res) {
    const model = req.params.model;
    try {
      const carSearched = await db.Car.findAll({
        where: {
          model: {
            [Op.like]: `%${model}%`,
          },
        },
      });

      res.status(200).send(carSearched);
    } catch (error) {
      res.json(error);
    }
  },
  filtredCar: async function (req, res) {
    const filters = req.body;
    const { price, typevehicle, characteristics } = filters;

    const where = {
      price: {
        [Op.between]: price,
      },
      typevehicle: typevehicle,

      characteristics: characteristics,
    };
    try {
      const filtredOne = await db.Car.findAll({
        where,
        include: { model: db.Media, as: "Media" },
      });

      res.json(filtredOne);
    } catch (error) {
      res.json(error);
    }
  },
  searchCarById: async function (req, res) {
    try {
      const carById = await db.Car.findOne({
        where: { id: req.params.id * 1 },
      });
      console.log(carById);
      res.status(200).send(carById);
    } catch (error) {
      throw error;
    }
  },

  deletedAgencyCar: async function (req, res) {
    try {
      // console.log("from controller", req.body);
      console.log("id:", req.params.id);
      console.log("agencyId:", req.params.AgencyId);
      const deletedCar = await db.Car.destroy({
        where: {
          id: req.params.id,
          AgencyId: req.params.AgencyId,
        },
      });
      console.log("ee", "deletedCar");
      res.json(deletedCar);
    } catch (error) {
      throw error;
    }
  },

  getAllCarsByAgencyId: async function (req, res) {
    try {
      console.log("requesttttttttttttt bodyyyyyyyyyyyyyyyyy", req.body);
      const allCars = [];
      const allCarsByAgency = await db.Car.findAll({
        where: { AgencyId: req.params.AgencyId },
      });
      for (const OneCar of allCarsByAgency) {
        const car = await db.Car.findOne({ where: { id: OneCar.id } });

        const carImage = await db.Media.findOne({
          where: { CarId: car.id },
        });
        const carInfo = {
          car: car,
          carImage: carImage,
        };

        allCars.push(carInfo);
      }
      res.status(200).send(allCars);
    } catch (error) {
      throw error;
    }
  },
};
