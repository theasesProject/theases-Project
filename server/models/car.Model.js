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
    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("available", "rented"),
      allowNull: true,
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
    numberPeople:{
      type: DataTypes.INTEGER
    },
    numberDoors:{
      type:DataTypes.INTEGER
    },
    numberBags:{
      type:DataTypes.INTEGER
    }
  });
  return Car;
};
