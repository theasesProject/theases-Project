const {
  CreateBooking,
  GetUnavailableDatesForCar,
  GetAvailableDatesForCar,
  UpdateService,
  GetAllServicesForAgency,
  GetAvailableCars,
  getRentalHistory,
  getRejectedHistory,
  getPendingHistory,
} = require("../controller/booking.controller");
const express = require("express");
const bookingRouter = express.Router();

bookingRouter.post("/createbooking", CreateBooking);

bookingRouter.get("/unavailabledates/:oneCar", GetUnavailableDatesForCar);

bookingRouter.get("/availabledates/:oneCar", GetAvailableDatesForCar);

bookingRouter.put("/updatebooking", UpdateService);

bookingRouter.get("/allServiceForAgency/:agencyId", GetAllServicesForAgency);
bookingRouter.get("/rejectedHistory",getRejectedHistory)
bookingRouter.get("/pedningHistory",getPendingHistory)
bookingRouter.get("/rentalHistory",getRentalHistory)
bookingRouter.post("/avaibleCar", GetAvailableCars);
module.exports = bookingRouter;
