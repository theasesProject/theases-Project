"use strict";

const { db } = require("../models/index");

const Admin = db.Admin;

const admin = {
  Name: "alaa",
  password: "rbk123",
  phoneNumber: "69420666",
  email: "alaasrioui@gmail.com",
  avatar:
    "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&uid=R68467429&ga=GA1.1.970682958.1696962532&semt=ais",
};

async function seedAdmin() {
  await Admin.create(admin);
}

seedAdmin()
  .then(() => {
    console.log("Admin seed complete!");
    process.exit(0);
  })
  .catch((err) => console.log(err));
