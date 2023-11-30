const { db } = require("../models/index");
const Admin = db.Admin;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// Controller methods for Admin
module.exports = {
  bringAdminData: async (req, res, next) => {
    try {
      const admin = await Admin.findAll({});
      res.json(Admin);
    } catch (error) {
      next(error);
    }
  },
  SignUpAdmin: async (req, res, next) => {
    const NameCheck = await Admin.findAll({
      where: {
        Name: req.body.Name,
      },
    });
    const emailCheck = await Admin.findAll({
      where: {
        email: req.body.email,
      },
    });
    if (NameCheck[0] || emailCheck[0]) {
      if (NameCheck[0]) {
        return res.status(403).send({
          status: "Blocked",
          message: "This AdminName Already Exists",
          found: NameCheck,
        });
      }
      if (emailCheck[0]) {
        return res.status(403).send({
          status: "Blocked",
          message: "This Email Already Exists",
          found: emailCheck,
        });
      }
    } else {
      const admin = await Admin.create(req.body);
      res.status(201).send({
        status: "success",
        message: "Admin added successfully!!!",
        data: admin,
      });
    }
    try {
    } catch (err) {
      next(err);
    }
  },
  // checks if a Admin exists using email
  emailLogin: async (req, res) => {
    try {
      console.log(req.body);
      const admin = await Admin.findOne({ where: { email: req.body.email } });
      if (!admin) {
        return res.status(404).json("Admin does not exist");
      }
      // if (!admin.dataValues) {
      //   return res.status(404).json("Admin does not exist");
      // }
      if (!(await bcrypt.compare(req.body.password, admin.dataValues.password))
      ) {
        return res.status(401).json("wrong password");
      }
      console.log("respone for login",await bcrypt.compare(req.body.password, admin.dataValues.password))
      const token = jwt.sign(admin.dataValues, process.env.JWT_SECRET_KEY);
      res.status(200).send(token);
    } catch (err) {
      throw (err)
    }
  },
  // gets Admin token from the front to verify it and sends it back to front
  handleToken: async (req, res) => {
    try {
      console.log("lllllllllllllllllllllllllll",req.body);
      const response = jwt.verify(req.body.token, process.env.JWT_SECRET_KEY);
      // delete response.password;
      res.status(200).json(response);
    } catch (err) {
      throw(err)
    }
  },

  // Get Admin by email
  getAdminByEmail: async (req, res) => {
    try {
      const Admin = await Admin.findOne({ where: { email: req.params.email } });
      if (!Admin) {
        return res.status(404).json("Admin does not exist");
      }
      res.status(200).send("Admin exists");
    } catch (err) {
      res.json(err);
    }
  },

  // Get Admin by phone number
  getAdminByPhoneNumber: async (req, res) => {
    try {
      const Admin = await Admin.findOne({
        where: { phoneNumber: req.params.phoneNumber },
      });
      if (!Admin) {
        return res.status(404).json("Admin does not exist");
      }
      res.status(200).send("Admin exists");
    } catch (err) {
      res.json(err);
    }
  },

  // Get a specific Admin by ID
  getAdminById: async (req, res) => {
    const AdminId = req.params.id;
    try {
      const Admin = await Admin.findByPk(AdminId);
      if (Admin) {
        res.json(Admin);
      } else {
        res.status(404).json({ message: "Admin not found" });
      }
    } catch (err) {
      res.json(err);
    }
  },

  // Update a Admin by ID
  updateAdmin: async (req, res) => {
    const AdminId = req.params.id;
    try {
      const [updated] = await Admin.update(req.body, {
        where: { id: AdminId },
      });
      if (updated) {
        const updatedAdmin = await Admin.findByPk(AdminId);
        res.json(updatedAdmin);
      } else {
        res.status(404).json({ message: "Admin not found" });
      }
    } catch (err) {
      res.json(err);
    }
  },

  // Delete a Admin by ID
  deleteAdmin: async (req, res) => {
    const AdminId = req.params.id;
    try {
      const deleted = await Admin.destroy({
        where: { id: AdminId },
      });
      if (deleted) {
        res.json({ message: "Admin deleted" });
      } else {
        res.status(404).json({ message: "Admin not found" });
      }
    } catch (err) {
      res.json(err);
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const allUsers = await db.User.findAll();
      res.send(allUsers);
    } catch (error) {
      throw error;
    }
  },
  updateOneUserblockState: async (req, res) => {
    try {
      const user = await db.User.findOne({ where: { id: req.params.id } });
      const oneUser = await db.User.update(
        { stateBlocked: !user.stateBlocked },
        {
          where: {
            id: user.id,
          },
        }
      );
      res.send(oneUser);
    } catch (error) {
      throw error;
    }
  },
};
