const { db } = require("../models/index");

function getDatesInRange(startDate, endDate) {
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    dates.push(currentDate.toISOString().split("T")[0]); // Store dates in ISO format (YYYY-MM-DD)
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}
module.exports = {
  CreateBooking: async function (req, res) {
    const { CarId, UserId, startDate, endDate } = req.body;

    const conflictingRental = await db.Service.findOne({
      where: {
        CarId: CarId,
        startDate: { $lt: endDate },
        endDate: { $gt: startDate },
      },
    });

    if (conflictingRental) {
      return res
        .status(400)
        .json({ message: "Car is not available for the selected dates." });
    }

    const datesInRange = getDatesInRange(startDate, endDate);
    const unavailableDates = await db.UnavailableDate.findAll({
      where: {
        CarId,
        unavailableDate: datesInRange,
      },
    });

    if (unavailableDates.length > 0) {
      return res
        .status(400)
        .json({ message: "Selected date range is not available." });
    }

    const services = await db.Service.create({
      CarId: CarId,
      UserId: UserId,
      startDate,
      endDate,
    });

    // Insert records for unavailable dates
    for (const date of datesInRange) {
      await db.UnavailableDate.create({
        CarId,
        unavailableDate: date,
      });
    }

    return res.json(services);
  },
  GetAvailableDatesForCar: async function (req, res) {
    try {
      const { oneCar } = req.params; // Get the car identifier from the URL parameters

      const carBookings = await db.Service.findAll({
        where: {
          CarId: oneCar,
        },
      });

      const unavailableDates = await db.UnavailableDate.findAll({
        where: {
          CarId: oneCar,
        },
        attributes: ["unavailableDate"], // Select only the unavailableDate column
      });

      // Extract the dates from the results
      const bookingDates = carBookings.map((booking) => ({
        startDate: booking.startDate,
        endDate: booking.endDate,
      }));
      const unavailableDateList = unavailableDates.map(
        (date) => date.unavailableDate
      );

      // Process the bookings and unavailable dates to determine available dates
      const availableDates = [];

      for (const date of getDatesInRange(startDate, endDate)) {
        if (
          !unavailableDateList.includes(date) &&
          bookingDates.every((booking) => {
            return (
              new Date(date) < new Date(booking.startDate) ||
              new Date(date) > new Date(booking.endDate)
            );
          })
        ) {
          availableDates.push(date);
        }
      }

      res.json(availableDates);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  GetUnavailableDatesForCar: async function (req, res) {
    try {
      const { oneCar } = req.params; // Get the car identifier from the URL parameters

      // Query the database to find all unavailable dates for the specified car
      const unavailableDates = await db.UnavailableDate.findAll({
        where: {
          CarId: oneCar,
        },
        attributes: ["unavailableDate"], // Select only the unavailableDate column
      });

      // Extract the dates from the result
      const unavailableDateList = unavailableDates.map(
        (date) => date.unavailableDate
      );

      // Return the list of unavailable dates as a JSON response
      res.json(unavailableDateList);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  UpdateService: async function (req, res) {
    try {
      const { id, acceptation } = req.body;

      const service = await db.Service.findByPk(id);

      if (!service) {
        return res.status(404).json({ message: "Service not found." });
      }

      if (service.acceptation !== "pending") {
        return res
          .status(400)
          .json({ message: "Service is already accepted or rejected." });
      }

      if (acceptation === "rejected") {
        const startDate = service.startDate;
        const endDate = service.endDate;

        const datesInRange = getDatesInRange(startDate, endDate);

        await db.UnavailableDate.destroy({
          where: {
            CarId: service.CarId,
            unavailableDate: datesInRange,
          },
        });
      }

      await service.update({ acceptation });

      return res.json({ message: "Service updated successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  GetAllServicesForAgency: async function (req, res) {
    try {
      const serviceObj = [];
      const { agencyId } = req.params;

      const services = await db.Service.findAll({
        where: {
          UserId: agencyId,
        },
      });
      for (const service of services) {
        console.log(service.CarId, "service");
        const car = await db.Car.findOne({
          where: { id: service.CarId },
        });
        const carImage = await db.CarMedia.findOne({
          where: { CarId: service.CarId },
        });
        const user = await db.User.findOne({ where: { id: service.UserId } });
        const serviceInfo = {
          car: car,
          carImage: carImage,
          user: user,
          service: service,
        };
        serviceObj.push(serviceInfo);
      }

      if (!services || services.length === 0) {
        return res
          .status(404)
          .json({ message: "No services found for the agency." });
      }

      return res.json(serviceObj);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};
