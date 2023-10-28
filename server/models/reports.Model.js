module.exports = ( DataTypes, connection) => {
  const Report = connection.define("report", {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Report;
};
