module.exports = (DataTypes, connection) => {
  const validator = require("validator");
  const bcrypt = require("bcrypt");
  const saltRounds = bcrypt.genSaltSync(10);  
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
    carsRented: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   validator: function (v) {
      //     return validator.isStrongPassword(v, {
      //       minLength: 8,
      //       minLowercase: 1,
      //       minUppercase: 1,
      //       minNumbers: 1,
      //       minSymbols: 1,
      //     });
      //   },
      //   message:
      //     "Password must contain at least one special character, one lowercase letter, one uppercase letter, one number, and be at least 8 characters long",
      // },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      // validate: {
      //   validator: validator.isEmail,
      //   message: "Email is not valid",
      // },
    },
    dateOfBirth: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue:false,
      allowNull: false
    },
    isArchived: {
      type: DataTypes.BOOLEAN,
      defaultValue:false,
      allowNull: false
    },
    isBlocked: {
      type: DataTypes.BOOLEAN,
      defaultValue:false,
      allowNull: false
    },
    selfie: {
      type: DataTypes.STRING,
      defaultValue:
        "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&uid=R68467429&ga=GA1.1.970682958.1696962532&semt=ais",
      allowNull: false,
    },
    drivingLicenseFront: {
      type: DataTypes.STRING,
      defaultValue:
        "https://as1.ftcdn.net/v2/jpg/04/60/01/36/1000_F_460013622_6xF8uN6ubMvLx0tAJECBHfKPoNOR5cRa.jpg",
      allowNull: false,
    },
    drivingLicenseBack: {
      type: DataTypes.STRING,
      defaultValue:
        "https://as1.ftcdn.net/v2/jpg/04/60/01/36/1000_F_460013622_6xF8uN6ubMvLx0tAJECBHfKPoNOR5cRa.jpg",
      allowNull: false,
    },
    passport: {
      type: DataTypes.STRING,
      defaultValue:
        "https://as1.ftcdn.net/v2/jpg/04/60/01/36/1000_F_460013622_6xF8uN6ubMvLx0tAJECBHfKPoNOR5cRa.jpg",
      allowNull: false,
    },

    stateBlocked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    verificationOTP: {
      type: DataTypes.STRING,
      allowNull: true,
      },
    forgetPasswordOTP: {
      type: DataTypes.STRING,
      allowNull: true,
      },
  });
  User.beforeCreate((User, options) => {
    User.password = bcrypt.hashSync(User.password, saltRounds);
  });
  return User;
};
