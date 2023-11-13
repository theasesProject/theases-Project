require("dotenv").config();
const { db } = require("../models/index");
const User = db.User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// Controller methods for User
module.exports = {
  bringUsersData: async (req, res, next) => {
    try {
      const Users = await db.User.findAll();
      res.json(Users);
    } catch (error) {
      next(error);
    }
  },
  SignUpUser: async (req, res, next) => {
    const NameCheck = await db.User.findAll({
      where: {
        userName: req.body.userName,
      },
    });
    const emailCheck = await db.User.findAll({
      where: {
        email: req.body.email,
      },
    });
    if (NameCheck[0] || emailCheck[0]) {
      if (NameCheck[0]) {
        return res.status(403).send({
          status: "Blocked",
          message: "This UserName Already Exists",
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
      const User = await db.User.create(req.body);
      res.status(201).send({
        status: "success",
        message: "user added successfully!!!",
        data: User,
      });
    }
    try {
    } catch (err) {
      next(err);
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
      console.log(response.type);
      if (response.type === "agency") {
        const task = await User.findOne({
          where: { email: response.email },
          include: ["Agency"],
        });
        if (task) {
          delete task.password;
        }
        res.json(task);
      } else {
        res.status(200).json(response);
      }
    } catch (err) {
      res.json(err);
    }
  },

  // Get all user info by email
  getUserInfoByEmail: async (req, res) => {
    try {
      const user = await User.findOne({
        where: { email: req.params.email },
        exclude: "password",
      });
      if (!user) {
        return res.status(404).json("user does not exist");
      }
      res.status(200).send(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // checks by email if a user exists in database
  getUserByEmail: async (req, res) => {
    try {
      const user = await User.findOne({ where: { email: req.params.email } });
      if (!user) {
        return res.status(404).json("user does not exist");
      }
      res.status(200).send("user exists");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // checks by phone number if a user exists in database
  getUserByPhoneNumber: async (req, res) => {
    try {
      const user = await User.findOne({
        where: { phoneNumber: req.params.phoneNumber },
      });
      if (!user) {
        return res.status(404).json("user does not exist");
      }
      res.status(200).send("user exists");
    } catch (err) {
      res.status(500).json(err);
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
      res.json(err);
    }
  },

  // Update a user by ID
  updateUser: async (req, res) => {
    try {
      const userId = req.params.id;
      if (req.body.hasOwnProperty("password")) {
        const { password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.update(
          { ...req.body, password: hashedPassword },
          {
            where: { id: userId },
          }
        );
      } else {
        await User.update(req.body, {
          where: { id: userId },
        });
      }
      const user = await User.findByPk(userId, {
        attributes: { exclude: "password" },
      });
      res.status(201).send(user);
    } catch (err) {
      res.status(500).json(err);
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
      res.json(err);
    }
  },

  // I made this controller just to get a password and compare it with the one in the data base and check if it's true or not
  checkPassword: async (req, res) => {
    try {
      const { password } = req.body;
      const { id } = req.params;
      const user = await User.findOne({ where: { id: id } });
      const response = await bcrypt.compare(password, user.password);
      console.log(response);
      if (!response) {
        return res.send("no match");
      }
      return res.status(200).send("match");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  sendResetPasswordConfirmationCode: async (req, res) => {
    let code = "";
    for (let digit = 0; digit < 5; digit++) {
      code += Math.floor(Math.random() * 10);
    }
    const { email } = req.body;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: "rentngo.c4@gmail.com",
        pass: "wdeg xkok redv naue",
      },
      secure: true, // true for 465, false for other ports
    });
    const mailOptions = {
      from: "Rent & Go rentngo.c4@gmail.com",
      to: email,
      subject: "Reset Password",
      text: `This is your confirmation code: ${code}`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      // if (err) res.status(500).send(err);
      if (err) throw err;
      else res.status(201).send(code);
    });
  },
  confirmResetPasswordConfirmationCode: async (req, res) => {
    try {
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
