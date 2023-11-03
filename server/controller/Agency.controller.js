const { db } = require("../models/index");
const Agency = db.Agency;
const User = db.User;
module.exports = {
  CreateAgency: async (req, res, next) => {
       console.log('allaaaaaaaaaaaaaaaaaaa') // this line will be replaced somewhere else, its type should be an agency when the admin accepts his requeest
    await User.update({ type: "agency" }, { where: { id: req.body.UserId } });

    const agency = await db.Agency.create(req.body);
   
    res.status(201).send({
      status: "success",
      message: "agency added successfully!!!",
      data: agency,
    });
    try {
    } catch (err) {
    console.log('allaaaaaaaaaaaaaaaaaaa')

      next(err);
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
