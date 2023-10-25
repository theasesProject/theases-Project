module.exports = (sequelize, DataTypes, connection) => {
  const Messages = connection.define("messages", {
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Messages;
};
