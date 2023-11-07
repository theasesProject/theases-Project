module.exports = (DataTypes, connection) => {
  const Agency = connection.define("Agency", {
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    verificationStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    companyNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deposit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    transportation: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Agency;
};
