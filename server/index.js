const express = require("express");
// const { Expo } = require("expo-server-sdk");
require("./models");
const cors = require("cors");
const app = express();
const port = 5000;

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
const bookingRouter = require("./router/booking.Router");
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
app.use("/api/booking", bookingRouter);
app.use("/api/chat", chatRouter);
app.listen(5000, function () {
  console.log("Server is running on port 5000", port);
});

// app.post("/send-notification", async (req, res) => {
//   try {
//     const { to, title, body } = req.body;

//     if (!Expo.isExpoPushToken(to)) {
//       return res.status(400).json({ error: "Invalid Expo Push Token" });
//     }

//     const messages = [
//       {
//         to,
//         sound: "default",
//         title,
//         body,
//         data: { someData: "goes here" },
//       },
//     ];

//     const receipts = await expo.sendPushNotificationsAsync(messages);
//     console.log(receipts, "received");
//     res.json({ success: true });
//   } catch (error) {
//     console.error("Error sending push notification:", error);
//     res.status(500).json({ error: "Failed to send push notification" });
//   }
// });
