const { db } = require("../models/index");
const Request = db.Request;
const Media = db.CarMedia;

module.exports = {
  // this is the controller that'll fetch all requests for the use, each one will have all its images included
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
      const response = await Request.create({
        ...req.body,
        UserId: req.params.id,
      });
      res.status(201).send(response);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
