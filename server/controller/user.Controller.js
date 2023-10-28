const { db } = require("../models/index");
const User = db.User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// Controller methods for User
module.exports = {
  bringUsersData: async (req, res,next) => {
    try {
        const Users = await db.User.findAll({
        })
        res.json(Users)
    } catch (error) {
         next(error)
    }
},
SignUpUser:async(req,res,next)=>{
    const NameCheck= await db.User.findAll({
        where:{
            userName:req.body.userName
        }
    })
    const emailCheck= await db.User.findAll({
        where:{
            email:req.body.email
        }
    })
    if (NameCheck[0]||emailCheck[0]) {
        if (NameCheck[0]) {
            return res.status(403).send({
                status: "Blocked",
                message: "This UserName Already Exists",
                found:NameCheck
              })
        }
        if (emailCheck[0]) {
           return  res.status(403).send({
                status: "Blocked",
                message: "This Email Already Exists",
                found:emailCheck
              })
        }
    }else{
        const User = await db.User.create(req.body);
        res.status(201).send({
          status: "success",
          message: "user added successfully!!!",
          data: User,
        });
    }
    try {
    } catch (err) {
        next(err)
    }
},
  // checks if a user exists using email
  emailLogin: async (req, res) => {
    try {
      const user = await User.findOne({ where: { email: req.body.email } });
      if (!user) {
        return res.status(404).json("user does not exist");
      }
      if (!(await bcrypt.compare(req.body.password, user.password))) {
        return res.status(401).json("wrong password");
      }
      const token = jwt.sign(user.dataValues, process.env.JWT_SECRET_KEY);
      res.send(token);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  // checks if a user exists using phone number
  phoneLogin: async (req, res) => {
    try {
      const user = await User.findOne({
        where: { phoneNumber: req.body.phoneNumber },
      });
      if (!user) {
        return res.status(404).json("user does not exist");
      }
      if (!(await bcrypt.compare(req.body.password, user.password))) {
        return res.status(401).json("wrong password");
      }
      const token = jwt.sign(user.dataValues, process.env.JWT_SECRET_KEY);
      res.send(token);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  // gets users token from the front to verify it and sends it back to front
  handleToken: async (req, res) => {
    try {
      const response = jwt.verify(req.body.token, process.env.JWT_SECRET_KEY);
      delete response.password;
      res.status(200).json(response);
    } catch (err) {
      res.status(500).send(err);
    }
  },


  // Get a specific user by ID
  getUserById: async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await User.findByPk(userId);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (err) {
      throw err;
    }
  },

  // Update a user by ID
  updateUser: async (req, res) => {
    const userId = req.params.id;
    try {
      const [updated] = await User.update(req.body, {
        where: { id: userId },
      });
      if (updated) {
        const updatedUser = await User.findByPk(userId);
        res.json(updatedUser);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (err) {
      throw err;
    }
  },

  // Delete a user by ID
  deleteUser: async (req, res) => {
    const userId = req.params.id;
    try {
      const deleted = await User.destroy({
        where: { id: userId },
      });
      if (deleted) {
        res.json({ message: "User deleted" });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (err) {
      throw err;
    }
  },
};
