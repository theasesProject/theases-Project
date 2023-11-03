module.exports = ( DataTypes, connection) => {
  const RoomChat = connection.define("room", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    agencyId:{
      type : DataTypes.INTEGER,
      allowNull: false,
    }
  });
  return RoomChat;
};
