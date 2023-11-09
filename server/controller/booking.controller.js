const { db } = require("../models/index");
const { Op } = require("sequelize");
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
    const unavailableDates = await db.Availability.findAll({
      where: {
        CarId,
        date: datesInRange,
        isAvailable: false,
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
      await db.Availability.create({
        CarId,
        date,
        isAvailable: false,
      });
    }

    return res.json(services);
  },

  GetAvailableDatesForCar: async function (req, res) {
    try {
      const { oneCar } = req.params;
      const startDate = req.body.startDate;
      const endDate = req.body.endDate;

      const unavailableDates = await db.Availability.findAll({
        where: {
          CarId: oneCar,
          date: getDatesInRange(startDate, endDate),
          isAvailable: false,
        },
        attributes: ["date"],
      });

      const unavailableDateList = unavailableDates.map((date) => date.date);

      const availableDates = getDatesInRange(startDate, endDate).filter(
        (date) => !unavailableDateList.includes(date)
      );

      res.json(availableDates);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  GetUnavailableDatesForCar: async function (req, res) {
    try {
      const { oneCar } = req.params;

      const unavailableDates = await db.Availability.findAll({
        where: {
          CarId: oneCar,
          isAvailable: false,
        },
        attributes: ["date"],
      });

      const unavailableDateList = unavailableDates.map((date) => date.date);

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

        await db.Availability.destroy({
          where: {
            CarId: service.CarId,
            date: datesInRange,
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
        console.log(car, "car");
        const carImage = await db.Media.findOne({
          where: { CarId: service.CarId },
        });
        const user = await db.User.findOne({
          where: { id: service.UserId * 1 },
        });
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
  GetAvailableCars: async function (req, res) {
    try {
      const { startDate, endDate, price, characteristics, type, deposit } =
        req.body;

      const carBookings = await db.Service.findAll();
      const unavailableDates = await db.Availability.findAll({
        where: {
          date: getDatesInRange(startDate, endDate),
          isAvailable: false,
        },
        attributes: ["CarId"],
      });

      const unavailableCarIds = unavailableDates.map(
        (availability) => availability.CarId
      );

      const whereClause = {
        id: { [Op.notIn]: unavailableCarIds },
      };

      if (price) {
        whereClause.price = {
          [Op.between]: price,
        };
      }

      if (characteristics) {
        whereClause.characteristics = characteristics;
      }

      if (type) {
        whereClause.typevehicle = type;
      }

      if (deposit) {
        whereClause["Agency.deposit"] = {
          [Op.gte]: deposit,
        };
      }

      const availableCars = await db.Car.findAll({
        where: whereClause,
        include: [
          { model: db.Media, as: "Media" },
          { model: db.Agency, as: "Agency" },
        ],
      });

      res.json(availableCars);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
