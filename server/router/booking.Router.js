const {
  CreateBooking,
  GetUnavailableDatesForCar,
  GetAvailableDatesForCar,
  UpdateService,
  GetAllServicesForAgency,
} = require("../controller/booking.controller");
const express = require("express");
const bookingRouter = express.Router();

bookingRouter.post("/createbooking", CreateBooking);

bookingRouter.get("/unavailabledates/:oneCar", GetUnavailableDatesForCar);

bookingRouter.get("/availabledates/:oneCar", GetAvailableDatesForCar);

bookingRouter.put("/updatebooking", UpdateService);

bookingRouter.get("/allServiceForAgency/:agencyId", GetAllServicesForAgency);
module.exports = bookingRouter;
