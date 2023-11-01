module.exports = ( DataTypes, connection) => {
    const Request = connection.define("request", {
        transportation: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },
    });
    return Request;
  };
  