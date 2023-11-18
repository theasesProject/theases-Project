const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const { Server } = require("socket.io");

app.use(cors());
require("dotenv").config();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000`,
        methods: ["GET", "POST", "PUT"],
    }
});

const PORT = process.env.PORT || 3002;

let httpServer = server.listen(PORT, () => {
    console.log(`Server is running on port ${3002}`);
});

io.listen(httpServer);

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
    let room;

    socket.on("join-room", (id) => {
        room = id;
        socket.join(id);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });

    socket.on("send-message", (data) => {
        socket.to(room).emit("receive-message", data);
    });

    socket.on("send-document", (document) => {
        // Broadcast the document to all clients in the room except the sender
        socket.to(room).emit("receive-document", document);
    });
});
