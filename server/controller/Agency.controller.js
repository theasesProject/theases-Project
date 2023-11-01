const { db } = require("../models/index");
const Agency = db.Agency;
module.exports = {
    CreateAgency: async (req, res, next) => {
        const agency = await db.Agency.create(req.body);
        res.status(201).send({
            status: "success",
            message: "agency added successfully!!!",
            data: agency,
        });
        try {
        } catch (err) {
            next(err);
        }
    },
    UpdateAgency: async (req, res, next) => {
        try {
            const agency = req.body.id
            const task = await Agency.Update(req.body.data,{where:{
                id:agency
            }})
            res.json(task)   
        } catch (error) {
            next(error)
        }
    }
}