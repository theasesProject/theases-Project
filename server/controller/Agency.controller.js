const { db } = require("../models/index");
const Agency = db.Agency;
const Request = db.Request;
const User = db.User;
module.exports = {
  fetchAll: async (req, res, next) => {
    try {
      const data = await Agency.findAll()
      res.status(200).send({
        data:data,
        message:"Data Found",
        status:"success"
      })
    } catch (er) {
      next(er)
    }
  },
  CreateAgency: async (req, res, next) => {
    await User.update({ type: "agency" }, { where: { id: req.body.UserId } });

    
    try {
      // res.status(201).send({
        //   status: "success",
      //   message: "agency added successfully!!!",
      //   data: agency,
      // });
      // const { reqId } = req.params;
      // await Request.update({ verified: true }, { where: { id: reqId } });
      // const request = await Request.findOne({
      //   where: { id: reqId },
      //   attributes: { exclude: ["id", "createdAt", "updatedAt"] },
      // });
      // const name = request.agencyName;
      // delete request.agencyName;
      // const agency = await Agency.create({
      //   ...request.dataValues,
      //   name: name,
      //   verificationStatus: true,
      //   requestId: reqId,
      // });
        const agency = await db.Agency.create(req.body);
      await User.update({ type: "agency" }, { where: { id: agency.UserId } });
      res.status(201).send({
        status: "success",
        message: "agency added successfully!!!",
        data: agency,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  UpdateAgency: async (req, res, next) => {
    try {
      const agency = req.body.id;
      const task = await Agency.Update(req.body.data, {
        where: {
          id: agency,
        },
      });
      res.json(task);
    } catch (error) {
      next(error);
    }
  },
};
