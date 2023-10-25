module.exports = (sequelize, DataTypes, connection) => {
  const Agency = connection.define("Agency", {
    papers: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    verificationStatus: {
      type: DataTypes.Boolean,
      allowNull: false,
      defaultValue: false,
    },
    companyNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deposit: {
      type: DataTypes.Number,
      allowNull: false,
    },
    stateBlocked: {
      type: DataTypes.Boolean,
      allowNull: false,
      defaultValue: false,
    },
    transportation: {
      type: DataTypes.Boolean,
      allowNull: false,
      defaultValue: false,
    },
  });
  return Agency;
};
