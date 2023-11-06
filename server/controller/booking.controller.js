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

    await db.Service.create({
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

    return res.json({ message: "Car rental successful." });
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
};
