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
      console.log(req.body);
      const response = await Request.create({
        ...req.body,
        UserId: req.params.id,
      });
     console.log('aalaaaa',response);
      res.status(201).send(response);
    } catch (err) {
      // res.status(500).json(err);
      throw err;
    }
  },
  // this is the controller that'll fetch all pending requests for the admin, each one will have all its images included
  getAllUnverifiedRequests: async (req, res) => {
    try {
      const response = await Request.findAll({
        where: { verified: false },
        include: Media,
      });
      res.status(200).send(response);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  declineRequest: async (req, res) => {
    try {
      await Media.destroy({ where: { requestId: req.params.id } });
      await Request.destroy({ where: { id: req.params.id } });
      res.status(204).send("deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
