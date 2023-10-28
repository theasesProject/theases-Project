module.exports = ( DataTypes, connection) => {
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
    period: {
      type: DataTypes.ENUM("daily", "weekly", "monthly"),
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
    acceptation:{
      type:DataTypes.ENUM("rejected","accepted","pending"),
      allowNull:false,
      defaultValue:"pending"
    },
    
  });
  return Car;
};
