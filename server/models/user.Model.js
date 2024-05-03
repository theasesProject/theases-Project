module.exports = (DataTypes, connection) => {
  const bcrypt = require("bcrypt");
  const saltRounds = bcrypt.genSaltSync(10);
  const User = connection.define('User', {
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true

    },
    carsRented: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue:0
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:"1234"
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true

    },
    RNE: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: true,
      // defaultValue:"Sun Oct 29 2023 13:44:49 GMT+0100 (West Africa Standard Time)"
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&uid=R68467429&ga=GA1.1.970682958.1696962532&semt=ais'
    }
    ,
    type: {
      type: DataTypes.ENUM("client", "agency"),
      defaultValue: "client",
      allowNull: true
    },
    idCard: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    stateBlocked: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    isActive:{
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  });
  User.beforeCreate((User, options) => {
    User.password = bcrypt.hashSync(User.password, saltRounds);
  });
  return User
}