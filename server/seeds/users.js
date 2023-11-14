const { db } = require("../models/index"); // Adjust the path to your models

const users = [
  {
    userName: "User1",
    phoneNumber: "1234567890",
    password: "password1",
    email: "user1@example.com",
    dateOfBirth: "1990-01-01T00:00:00.000Z",
    idCard: "123456789",
  },
  {
    userName: "User2",
    phoneNumber: "1234567891",
    password: "password2",
    email: "user2@example.com",
    dateOfBirth: "1991-02-02T00:00:00.000Z",
    idCard: "123456790",
  },
  {
    userName: "User3",
    phoneNumber: "1234567892",
    password: "password3",
    email: "user3@example.com",
    dateOfBirth: "1992-03-03T00:00:00.000Z",
    idCard: "123456791",
  },
  {
    userName: "User4",
    phoneNumber: "1234567893",
    password: "password4",
    email: "user4@example.com",
    dateOfBirth: "1993-04-04T00:00:00.000Z",
    idCard: "123456792",
  },
  {
    userName: "User5",
    phoneNumber: "1234567894",
    password: "password5",
    email: "user5@example.com",
    dateOfBirth: "1994-05-05T00:00:00.000Z",
    idCard: "123456793",
  },
  {
    userName: "User6",
    phoneNumber: "1234567895",
    password: "password6",
    email: "user6@example.com",
    dateOfBirth: "1995-06-06T00:00:00.000Z",
    idCard: "123456794",
  },
  {
    userName: "User7",
    phoneNumber: "1234567896",
    password: "password7",
    email: "user7@example.com",
    dateOfBirth: "1996-07-07T00:00:00.000Z",
    idCard: "123456795",
  },
  {
    userName: "User8",
    phoneNumber: "1234567897",
    password: "password8",
    email: "user8@example.com",
    dateOfBirth: "1997-08-08T00:00:00.000Z",
    idCard: "123456796",
  },
  {
    userName: "User9",
    phoneNumber: "1234567898",
    password: "password9",
    email: "user9@example.com",
    dateOfBirth: "1998-09-09T00:00:00.000Z",
    idCard: "123456797",
  },
  {
    userName: "User10",
    phoneNumber: "69420666",
    password: "password10",
    email: "alaasrioui@gmail.com",
    dateOfBirth: "1999-10-10T00:00:00.000Z",
    idCard: "123456798",
  },
];

async function seedUsers() {
  for (let user of users) {
    await db.User.create(user);
  }
}

seedUsers().then(() => {
  console.log("Seed complete!");
  process.exit(0);
});
