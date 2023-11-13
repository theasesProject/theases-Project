const socketIo = require("socket.io");
const cors = require("cors");
const express = require("express");
const app = express();
const port = 3400;
const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000`,
    methods: ["GET", "POST", "PUT"],
  },
});

let onlineUsers = new Map();
console.log(onlineUsers, "onlineUser");

const addNewUser = (UserId, socketId) => {
  if (!onlineUsers.has(UserId)) {
    onlineUsers.set(UserId, { socketId });
  }
};

const removeUser = (socketId) => {
  onlineUsers.forEach((user, key) => {
    if (user.socketId === socketId) {
      onlineUsers.delete(key);
    }
  });
};

const getUser = (UserId) => {
  return onlineUsers.get(UserId);
};

io.on("connection", (socket) => {
  socket.on("newUser", (UserId) => {
    addNewUser(UserId, socket.id);
  });

  socket.on("sendNotification", ({ senderId, receiverId, type }) => {
    const receiver = getUser(receiverId);
    if (receiver) {
      io.to(receiver.socketId).emit("getNotification", {
        senderId,
        type,
      });
    } else {
      console.log(`User with UserId ${receiverId} not found or offline.`);
    }
  });

  socket.on("sendText", ({ senderId, receiverId, text }) => {
    const receiver = getUser(receiverId);
    if (receiver) {
      io.to(receiver.socketId).emit("getText", {
        senderId,
        text,
      });
    } else {
      console.log(`User with UserId ${receiverId} not found or offline.`);
    }
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});
let a = app.listen(3400, () => console.log(`listening on port 3002 `));
io.listen(a);
module.exports = io;
