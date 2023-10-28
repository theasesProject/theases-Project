const express = require('express')

require("./models")
const cors = require('cors')
const app = express()
const port = 5000
const http = require("http");
const dotenv = require("dotenv")
const bodyparser = require("body-parser");
const logger = require("morgan");
var jwt = require('jsonwebtoken');
app.set("TOKEN_SECRET", `${process.env.JWT_SECRET_KEY}`);
app.use(logger("dev"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cors())
app.use(express.json())
const carRouter = require("./router/carRouter")
// const UserRouter = require("./router/userRouter")
const userRouter = require("./router/user.Route");

//!routers
// app.use("/api/User",UserRouter)
app.use("/api/car", carRouter)
app.use("/api/users", userRouter);



app.listen(5000, function () {
   console.log("Server is running on port 5000", port)
})
app.use(function (err, req, res, next) {
   console.log(err);

   if (err.status === 404)
      res.status(404).json({ message: "Not found" });
   else
      res.status(500).json({ message: "Something looks wrong :( !!!" });
});



