module.exports = (DataTypes, connection) => {
  const Car = connection.define("Car", {
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    priceWeekly: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    priceMonthly: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("available", "rented"),
      allowNull: false,
      defaultValue: "available",
    },
    horsePower: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    typeOfFuel: {
      type: DataTypes.ENUM("Gasoline", "Diesel", "Electric"),
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    warrantyInsurance: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    deposit: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    acceptation: {
      type: DataTypes.ENUM("rejected", "accepted", "pending"),
      allowNull: false,
      defaultValue: "pending",
    },
    typevehicle: {
      type: DataTypes.ENUM("Economical", "Luxury", "Sports", "Commercial"),
    },
    characteristics: {
      type: DataTypes.ENUM("Automatic", "Manual", "Semi-Automatic"),
    },
  });
  return Car;
};
