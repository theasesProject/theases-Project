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
  GetAllServicesForUser,
  MarkDatesAsUnavailable,
  deletedServiceForUser,
  deletedServiceForagency,
} = require("../controller/booking.controller");
const express = require("express");
const bookingRouter = express.Router();

bookingRouter.post("/createbooking", CreateBooking);

bookingRouter.get("/unavailabledates/:oneCar", GetUnavailableDatesForCar);

bookingRouter.delete(
  "/deletedServiceByAgency/:CarId/:id",
  deletedServiceForagency
);
bookingRouter.delete(
  "/deletedServiceByUser/:UserId/:id",
  deletedServiceForUser
);
bookingRouter.get("/availabledates/:oneCar", GetAvailableDatesForCar);

bookingRouter.put("/updatebooking", UpdateService);
bookingRouter.post("/agencyUpdateDate", MarkDatesAsUnavailable);
bookingRouter.get("/allServiceForAgency/:agencyId", GetAllServicesForAgency);
bookingRouter.get("/rejectedHistory",getRejectedHistory)
bookingRouter.get("/pedningHistory",getPendingHistory)
bookingRouter.get("/rentalHistory",getRentalHistory)
bookingRouter.post("/avaibleCar", GetAvailableCars);
bookingRouter.get("/allserviceforUser/:userId", GetAllServicesForUser);
module.exports = bookingRouter;
