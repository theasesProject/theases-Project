module.exports = ( DataTypes, connection) => {
  const RoomChat = connection.define("room", {
    user2:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    avatarUrl:{
      type : DataTypes.STRING,
      allowNull: false,
    },
    name:{
      type : DataTypes.STRING,
      allowNull: false,
    }
  });
  return RoomChat;
};
