const express = require("express");
const http = require("http");
const userRouter = require("./routes/user.Route");
require("./models");
const cors = require("cors");
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());
app.use("/api/users", userRouter);
app.listen(port, function () {
  console.log("Server is running on port: ", port);
});
