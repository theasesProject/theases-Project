module.exports = (DataTypes, connection) => {
  const User = connection.define("User", {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("client", "agency"),
      defaultValue: "client",
    },
    idCard: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return User;
};
