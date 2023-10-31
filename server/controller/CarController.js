const { db } = require("../models/index");
const { Sequelize, Op } = require("sequelize");

module.exports = {
  getAllCars: async function (req, res) {
    try {
      const allCars = await db.Car.findAll({
        include: { model: db.CarMedia, as: "CarMedia" },
      });

      res.status(200).send(allCars);
    } catch (error) {
      throw error;
    }
  },

  CreateCar: async function (req, res) {
    try {
      const newCar = await db.Car.create({
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
        acceptation: "pending",
        typevehicle: req.body.typevehicle,
        characteristics: req.body.characteristics,
      });

      res.status(200).send(newCar);
    } catch (error) {
      throw error;
    }
  },
  createImage: async function (req, res) {
    try {
      const image = await db.CarMedia.create({
        media: req.body.media,
        CarId: req.body.CarId,
      });

      res.status(200).send(image);
    } catch (error) {
      throw error;
    }
  },
  filterCarByBrand: async function (req, res) {
    try {
      const carByBrand = await db.Car.findAll({
        where: { brand: req.body.brand },
      });

      res.status(200).send(carByBrand);
    } catch (error) {
      throw error;
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
      throw error;
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
      });

      res.json(filtredOne);
    } catch (error) {
      throw error;
    }
  },
 searchCarById:async function (req, res) {
    try {
      const carById = await db.Car.findOne({
        where: { id: req.params.id*1 },
      });
console.log( carById,)
      res.status(200).send(carById);
    } catch (error) {
      throw error;
    }
  }
 
};
