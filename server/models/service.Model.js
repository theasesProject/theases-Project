module.exports = (sequelize, DataTypes, connection) => {
    const Service = connection.define("Service", {
    
      destination: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.Date,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.Date,
        allowNull: false,
      },

    });
    return Service;
  };
  