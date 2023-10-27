module.exports = (DataTypes, connection) => {
    const Service = connection.define("Service", {
    
      destination: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },

    });
    return Service;
  };
  