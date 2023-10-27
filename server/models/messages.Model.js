module.exports = ( DataTypes, connection) => {
  const Messages = connection.define("messages", {
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Messages;
};
