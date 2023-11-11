const express = require("express");

const socketIo = require("socket.io");
require("./models");
const cors = require("cors");
const app = express();
const port = 5000;
const http = require("http");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const server = http.createServer(app);
const io = socketIo(server);
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

io.on("connection", (socket) => {
  console.log("A user connected");

  // Assume you have a user ID associated with each booking
  socket.on("notification", (data) => {
    const { UserId, message } = data;
    socket.join(UserId);
    // Emit the notification to the specific user
    io.emit("notification", message);
    console.log(message, UserId, "messageBack");
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
server.listen(5000, function () {
  console.log("Server is running on port 5000", port);
});
