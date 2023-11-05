const { db } = require("../models/index");

module.exports = {
  CreateBooking: async function (req, res) {
    try {
      const newBooking = await db.Service.create({
        destination: req.body.destination,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        UserId: req.body.UserId,
        CarId: req.body.CarId,
      });
      console.log(newBooking, "aa");
      res.status(200).send(newBooking);
    } catch (error) {
      res.json(error);
    }
  },
};
