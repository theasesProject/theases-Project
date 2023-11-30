const { Sequelize, DataTypes } = require("sequelize");

const connection = new Sequelize("rent", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});
connection
  .authenticate()
  .then(() => {
    console.log("connected successfully");
  })
  .catch((err) => {
    console.error("error connecting to database", err);
  });

// connection.sync({ alter: true });
// connection.sync({ force: true });

const db = {};
db.connection = connection;
db.Sequelize = Sequelize;
db.UnavailableDate = require("./avaibilityDate.Model")(DataTypes, connection);
db.Admin = require("./admin.Model")(DataTypes, connection);
db.User = require("./user.Model")(DataTypes, connection);
db.Car = require("./car.Model")(DataTypes, connection);
db.Message = require("./messages.Model")(DataTypes, connection);
db.Agency = require("./agency.Model")(DataTypes, connection);
db.Media = require("./media.Model")(DataTypes, connection);
db.Review = require("./reviews.Model")(DataTypes, connection);
db.RoomChat = require("./roomChat.Model")(DataTypes, connection);
db.History = require("./history.Model")(DataTypes, connection);
db.Service = require("./service.Model")(DataTypes, connection);
db.Report = require("./reports.Model")(DataTypes, connection);
db.BookMark = require("./bookMarks.Model")(DataTypes, connection);
db.Request = require("./request.Model")(DataTypes, connection);
db.RentelRequest = require("./rentelRequest.Model")(DataTypes, connection);
db.Availability = require("./available")(DataTypes, connection);
db.Notifcation = require("./notification.Model")(DataTypes, connection);

db.User.hasOne(db.Agency);
db.Agency.belongsTo(db.User);

db.User.hasOne(db.Request);
db.Request.belongsTo(db.User);

db.Request.hasMany(db.Media);
db.Media.belongsTo(db.Request);

db.Service.hasMany(db.User);
db.User.belongsTo(db.Service);

db.Request.hasOne(db.Agency);
db.Agency.belongsTo(db.Request);

db.Agency.hasMany(db.Car);
db.Car.belongsTo(db.Agency);

db.Car.hasMany(db.Media);
db.Media.belongsTo(db.Car);

db.User.hasMany(db.Notifcation);
db.Notifcation.belongsTo(db.User);

db.User.hasMany(db.Car);
db.Car.belongsTo(db.User);

db.User.hasMany(db.Review);
db.Review.belongsTo(db.User);

db.Agency.hasMany(db.Review);
db.Review.belongsTo(db.Agency);

db.Car.hasMany(db.Review);
db.Review.belongsTo(db.Car);

// db.Car.hasMany(db.Service);
// db.Service.belongsTo(db.Car);

db.User.hasMany(db.Service);
db.Service.belongsTo(db.User);

db.User.hasMany(db.Report);
db.Report.belongsTo(db.User);

db.User.hasMany(db.RoomChat);
db.RoomChat.belongsTo(db.User);

db.Car.hasOne(db.Service);
db.Service.belongsTo(db.Car);

db.User.hasMany(db.Message);
db.Message.belongsTo(db.User);

db.RoomChat.hasMany(db.Message);
db.Message.belongsTo(db.RoomChat);

db.User.hasMany(db.History);
db.History.belongsTo(db.User);

db.Car.hasMany(db.History);
db.History.belongsTo(db.Car);

db.User.hasMany(db.BookMark);
db.BookMark.belongsTo(db.User);

db.BookMark.hasMany(db.Car);
db.Car.belongsTo(db.BookMark);

module.exports.db = db;
