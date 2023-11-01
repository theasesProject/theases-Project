const { db } = require("../models/index");
const { Sequelize, Op } = require("sequelize");

module.exports.add = async function (req, res) {
  try {
    const added = await db.BookMark.create(req.body);
    res.json(added);
  } catch (err) {
    throw err;
  }
};

module.exports.getAll = async function (req, res) {
  try {
    const all = await db.BookMark.findAll({
      where: {
        UserId: req.body.UserId,
      },
    });
    res.json(all);
  } catch (err) {
    throw err;
  }
};
module.exports.remove = async function (req, res) {
  try{
    const del = await db.BookMark.destroy({
      where:{
        CarId:req.params.CarId
      }
    })
    res.json(del)
  } catch (err) {
    throw err
  }
}