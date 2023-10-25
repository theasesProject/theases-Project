module.exports = (sequelize, DataTypes, connection) => {
  const RoomChat = connection.define("room", {
    roomName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return RoomChat;
};
