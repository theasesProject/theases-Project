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
  // CreateAgency: async (req, res, next) => {
  //   // await User.update({ type: "agency" }, { where: { id: req.body.UserId } });

    
  //   try {
  //     // res.status(201).send({
  //       //   status: "success",
  //     //   message: "agency added successfully!!!",
  //     //   data: agency,
  //     // });
  //     // const { reqId } = req.params;
  //     // await Request.update({ verified: true }, { where: { id: reqId } });
  //     // const request = await Request.findOne({
  //     //   where: { id: reqId },
  //     //   attributes: { exclude: ["id", "createdAt", "updatedAt"] },
  //     // });
  //     // const name = request.agencyName;
  //     // delete request.agencyName;
  //     // const agency = await Agency.create({
  //     //   ...request.dataValues,
  //     //   name: name,
  //     //   verificationStatus: true,
  //     //   requestId: reqId,
  //     // });
  //       const agency = await db.Agency.create(req.body);
  //     await User.update({ type: "agency" }, { where: { id: req.body.UserId } });
  //     res.status(201).send({
  //       status: "success",
  //       message: "agency added successfully!!!",
  //       data: agency,
  //     });
  //   } catch (err) {
  //     next(err);
  //   }
  // },
  CreateAgency: async (req, res, next) => {
    try {
      // Define the valid keys based on your model
      const validKeys = ['address', 'verificationStatus', 'companyNumber', 'deposit', 'transportation', 'name','UserId'];
  
      // Filter the input data
      const data = Object.keys(req.body)
        .filter(key => validKeys.includes(key))
        .reduce((obj, key) => {
          obj[key] = req.body[key];
          return obj;
        }, {});
  
      // Create the agency
      const agency = await db.Agency.create(data);
  
      // Update the user type
      await User.update({ type: "agency" }, { where: { id: req.body.UserId } });
  
      // Send the response
      res.status(201).send({
        status: "success",
        message: "Agency added successfully!!!",
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
