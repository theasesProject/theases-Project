const { db } = require("../models/index");
const Request = db.Request;
const Media = db.CarMedia;

module.exports = {
  getAll: async (req, res) => {
    try {
      const response = await Request.findAll({
        include: Media,
      });
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  createRequest: async (req, res) => {
    try {
      console.log(req.body);
      const response = await Request.create({
        ...req.body,
        UserId: req.params.id,
      });
      console.log("aalaaaa", response);
      res.status(201).send(response);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // this is the controller that'll fetch all pending requests for the admin, each one will have all its images included
  getAllUnvalidatedRequests: async (req, res) => {
    try {
      const response = Request.findAll({ where: { verified: false } });
      res.status(200).send(response);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
