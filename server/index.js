const express = require("express");
// const { Expo } = require("expo-server-sdk");
require("./models");
const socketIo = require("socket.io");
const cors = require("cors");
const app = express();
// const port = 5000;
const http = require("http");
const server = http.createServer(app);

const dotenv = require("dotenv");
const bodyparser = require("body-parser");
// const expo = new Expo();
const logger = require("morgan");
var jwt = require("jsonwebtoken");
app.set("TOKEN_SECRET", `${process.env.JWT_SECRET_KEY}`);
app.use(logger("dev"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
const carRouter = require("./router/carRouter");
const adminRouter = require("./router/adminRouter");
const userRouter = require("./router/user.Route");
const reviewRouter = require("./router/Review");
const bookMarksRouter = require("./router/BookMark.router");
const agencyRouter = require("./router/Agency");
const requestRouter = require("./router/request.Route");
const mediaRouter = require("./router/Media.Route");
const reportRouter = require("./router/reports");
const bookingRouter = require("./router/booking.Router");
const paymentRouter = require("./router/payment.Route");
const chatRouter = require("./router/chat.router");
//!routers
app.use("/api/car", carRouter);
app.use("/api/users", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/review", reviewRouter);
app.use("/api/bookmarks", bookMarksRouter);
app.use("/api/agency", agencyRouter);
app.use("/api/request", requestRouter);
app.use("/api/media", mediaRouter);
app.use("/api/report", reportRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/chat", chatRouter);
// app.listen(5000, function () {
//   console.log("Server is running on port 5000", port);
// });

app.use(function (err, req, res, next) {
  console.log(err);

  if (err.status === 404) res.status(404).json({ message: "Not found" });
  else res.status(500).json({ message: "Something looks wrong :( !!!" });
});
const io = socketIo(server, {
  cors: {
    origin: "http://your-react-native-app-ip:your-react-native-app-port", // Update with your React Native app details
    methods: ["GET", "POST"],
  },
});

// Set up middleware

// Create a map to store online users
let onlineUsers = new Map();
console.log(onlineUsers, "online");
// Function to add a new user to the onlineUsers map
const addNewUser = (userId, socketId) => {
  if (!onlineUsers.has(userId)) {
    onlineUsers.set(userId, { socketId });
    console.log(userId, socketId, "userId");
  }
};

// Function to remove a user when they disconnect
const removeUser = (socketId) => {
  onlineUsers.forEach((user, key) => {
    if (user.socketId === socketId) {
      onlineUsers.delete(key);
    }
  });
};

// Event listener for new socket connections
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Event listener for when a new user joins
  socket.on("newUser", (userId) => {
    console.log(`New user added: ${userId}`);
    addNewUser(userId, socket.id);
  });

  // Event listener for when the agency accepts a service
  socket.on("acceptService", ({ senderId, receiverId, message }) => {
    const receiver = onlineUsers.get(receiverId);
    if (receiver) {
      // Emit a "serviceAccepted" event to the user
      io.to(receiver.socketId).emit("serviceAccepted", {
        senderId,
        message,
      });
      console.log("rejected", receiver);
    } else {
      console.log(`User with UserId ${receiverId} not found or offline.`);
    }
  });

  // Event listener for when the agency rejects a service
  socket.on("rejectService", ({ senderId, receiverId, message }) => {
    const receiver = onlineUsers.get(receiverId);
    if (receiver) {
      // Emit a "serviceRejected" event to the user

      io.to(receiver.socketId).emit("serviceRejected", {
        senderId,
        message,
      });
      console.log("rejected", receiver);
    } else {
      console.log(`User with UserId ${receiverId} not found or offline.`);
    }
  });

  // Event listener for disconnect
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    removeUser(socket.id);
  });
});

// Start the server on a specified port
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
