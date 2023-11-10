module.exports = (DataTypes, connection) => {
  const UnavailableDate = connection.define("UnavailableDate", {
    CarId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unavailableDate: {
      type: DataTypes.DATEONLY,
    },
  });

  return UnavailableDate;
};
