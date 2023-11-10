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
    type: {
      type : DataTypes.STRING,
    },
    imageUrl:{
      type : DataTypes.STRING,
    }
  });
  return Messages;
};
