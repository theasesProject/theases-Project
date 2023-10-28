const { User } = require("../models/index"); // Import the User model
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// Controller methods for User
module.exports = {
  // Create a new user
  signUp: async (req, res) => {
    // ToRBaGa made this temp controller to add users, jiji make your changes
    try {
      const hashedPassword = bcrypt.hash(req.body.password);
      const response = await User.create({ ...req.body, hashedPassword });
      res.status(201).json(response);
    } catch (err) {
      throw err;
    }
  },

  // checks if a user exists using email
  emailLogin: async (req, res) => {
    try {
      const user = await User.findOne({ where: { email: req.body.email } });
      if (!user) {
        return res.status(404).json("user does not exist");
      }
      if (!bcrypt.compare(user.password, req.body.password)) {
        return res.status().json("wrong password");
      }
      const response = jwt.sign(user, "SECRET_KEY");
      res.send(response);
    } catch (err) {
      throw err;
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
      if (!bcrypt.compare(user.password, req.body.password)) {
        return res.status().json("wrong password");
      }
      const response = jwt.sign(user, "SECRET_KEY");
      res.send(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get a list of all users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      res.status(400).json({ error: error.message });
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
    } catch (error) {
      res.status(400).json({ error: error.message });
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
    } catch (error) {
      res.status(400).json({ error: error.message });
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
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
