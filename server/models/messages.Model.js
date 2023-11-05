module.exports = ( DataTypes, connection) => {
  const Messages = connection.define("messages", {
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    senderId:{
      type : DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Messages;
};
