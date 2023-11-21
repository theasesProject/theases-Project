"use strict";

const { db } = require("../models/index"); // Adjust the path to your models

const cars = [
  {
    model: "Model S",
    brand: "volkswagen",
    price: 80000,
    priceWeekly: 70000,
    priceMonthly: 60000,
    status: "available",
    horsePower: "170",
    typeOfFuel: "Electric",
    description: "Luxury electric sedan with long range.",
    warrantyInsurance:500,
    deposit: 10, // 10% of the car's price
    acceptation: "pending",
    typevehicle: "Luxury",
    characteristics: "Automatic",
    AgencyId: 1,
  },
  {
    model: "3 Series",
    brand: "renault",
    price: 40000,
    priceWeekly: 30000,
    priceMonthly: 10000,
    status: "available",
    horsePower: "255",
    typeOfFuel: "Gasoline",
    description: "Compact luxury sedan with sporty performance.",
    warrantyInsurance:500,
    deposit: 15, // 15% of the car's price
    acceptation: "pending",
    typevehicle: "Economical",
    characteristics: "Automatic",
    AgencyId: 1,
  },
  {
    model: "Model S",
    brand: "isuzu",
    price: 80000,
    priceWeekly: 70000,
    priceMonthly: 60000,
    status: "available",
    horsePower: "170",
    typeOfFuel: "Electric",
    description: "Luxury electric sedan with long range.",
    warrantyInsurance:500,
    warrantyInsurance:500,
    deposit: 10,
    acceptation: "pending",
    typevehicle: "Luxury",
    characteristics: "Automatic",
    AgencyId: 1,
  },
  {
    model: "3 Series",
    brand: "BMW",
    price: 40000,
    priceWeekly: 30000,
    priceMonthly: 20000,

    status: "available",
    horsePower: "255",
    typeOfFuel: "Gasoline",
    description: "Compact luxury sedan with sporty performance.",
    warrantyInsurance:500,
    deposit: 15,
    acceptation: "pending",
    typevehicle: "Economical",
    characteristics: "Automatic",
    AgencyId: 1,
  },
  {
    model: "Model X",
    brand: "MercedesBenz",
    price: 90000,
    priceWeekly: 70000,
    priceMonthly: 60000,
    status: "available",
    horsePower: "1020",
    typeOfFuel: "Electric",
    description: "Luxury electric SUV with exceptional performance.",
    warrantyInsurance:500,
    deposit: 10,
    acceptation: "pending",
    typevehicle: "Luxury",
    characteristics: "Automatic",
    AgencyId: 1,
  },
  {
    model: "5 Series",
    brand: "dacia",
    price: 50000,
    priceWeekly: 20000,
    priceMonthly: 10000,

    status: "available",
    horsePower: "335",
    typeOfFuel: "Gasoline",
    description: "Midsize luxury sedan with sporty performance.",
    warrantyInsurance:500,
    deposit: 15,
    acceptation: "pending",
    typevehicle: "Economical",
    characteristics: "Automatic",
    AgencyId: 1,
  },
  {
    model: "Model Y",
    brand: "peugeot",
    price: 30000,
    priceWeekly: 20000,
    priceMonthly: 10000,
    status: "available",
    horsePower: "451",
    typeOfFuel: "Electric",
    description: "Compact luxury electric SUV with long range.",
    warrantyInsurance:500,
    deposit: 10,
    acceptation: "pending",
    typevehicle: "Luxury",
    characteristics: "Automatic",
    AgencyId: 1,
  },
  {
    model: "7 Series",
    brand: "skoda",
    price: 70000,
    priceWeekly: 50000,
    priceMonthly: 60000,

    status: "available",
    horsePower: "523",
    typeOfFuel: "Gasoline",
    description: "Full-size luxury sedan with high-end features.",
    warrantyInsurance:500,
    deposit: 15,
    acceptation: "pending",
    typevehicle: "Economical",
    characteristics: "Automatic",
    AgencyId: 1,
  },
  {
    model: "7 Series",
    brand: "opel",
    price: 70000,
    priceWeekly: 50000,
    priceMonthly: 40000,

    status: "available",
    horsePower: "523",
    typeOfFuel: "Gasoline",
    description: "Full-size luxury sedan with high-end features.",
    warrantyInsurance:500,
    deposit: 15,
    acceptation: "pending",
    typevehicle: "Economical",
    characteristics: "Automatic",
    AgencyId: 1,
  },
  {
    model: "7 Series",
    brand: "suzuki",
    price: 70000,
    priceWeekly: 50000,
    priceMonthly: 20000,

    status: "available",
    horsePower: "523",
    typeOfFuel: "Gasoline",
    description: "Full-size luxury sedan with high-end features.",
    warrantyInsurance:500,
    deposit: 15,
    acceptation: "pending",
    typevehicle: "Economical",
    characteristics: "Automatic",
    AgencyId: 1,
  },
  {
    model: "Model S",
    brand: "volkswagen",
    price: 80000,
    priceWeekly: 70000,
    priceMonthly: 60000,
    status: "available",
    horsePower: "170",
    typeOfFuel: "Electric",
    description: "Luxury electric sedan with long range.",
    warrantyInsurance:500,
    deposit: 10, // 10% of the car's price
    acceptation: "pending",
    typevehicle: "Luxury",
    characteristics: "Automatic",
    AgencyId: 1,
  },
  {
    model: "3 Series",
    brand: "renault",
    price: 40000,
    priceWeekly: 70000,
    priceMonthly: 60000,

    status: "available",
    horsePower: "255",
    typeOfFuel: "Gasoline",
    description: "Compact luxury sedan with sporty performance.",
    warrantyInsurance:500,
    deposit: 15, // 15% of the car's price
    acceptation: "pending",
    typevehicle: "Economical",
    characteristics: "Automatic",
    AgencyId: 1,
  },
  {
    model: "Model S",
    brand: "isuzu",
    price: 80000,
    priceWeekly: 70000,
    priceMonthly: 60000,
    status: "available",
    horsePower: "170",
    typeOfFuel: "Electric",
    description: "Luxury electric sedan with long range.",
    warrantyInsurance:500,
    deposit: 10,
    acceptation: "pending",
    typevehicle: "Luxury",
    characteristics: "Automatic",
    AgencyId: 1,
  },
  {
    model: "3 Series",
    brand: "BMW",
    price: 40000,
    priceWeekly: 70000,
    priceMonthly: 60000,

    status: "available",
    horsePower: "255",
    typeOfFuel: "Gasoline",
    description: "Compact luxury sedan with sporty performance.",
    warrantyInsurance:500,
    deposit: 15,
    acceptation: "pending",
    typevehicle: "Economical",
    characteristics: "Automatic",
    AgencyId: 1,
  },
  {
    model: "Model X",
    brand: "MercedesBenz",
    price: 90000,
    priceWeekly: 70000,
    priceMonthly: 60000,
    status: "available",
    horsePower: "1020",
    typeOfFuel: "Electric",
    description: "Luxury electric SUV with exceptional performance.",
    warrantyInsurance:500,
    deposit: 10,
    acceptation: "pending",
    typevehicle: "Luxury",
    characteristics: "Automatic",
    AgencyId: 1,
  },
  {
    model: "5 Series",
    brand: "dacia",
    price: 50000,
    priceWeekly: 70000,
    priceMonthly: 60000,

    status: "available",
    horsePower: "335",
    typeOfFuel: "Gasoline",
    description: "Midsize luxury sedan with sporty performance.",
    warrantyInsurance:500,
    deposit: 15,
    acceptation: "pending",
    typevehicle: "Economical",
    characteristics: "Automatic",
    AgencyId: 1,
  },
  {
    model: "Model Y",
    brand: "peugeot",
    price: 10000,
    priceWeekly: 70000,
    priceMonthly: 60000,
    status: "available",
    horsePower: "451",
    typeOfFuel: "Electric",
    description: "Compact luxury electric SUV with long range.",
    warrantyInsurance:500,
    deposit: 10,
    acceptation: "pending",
    typevehicle: "Luxury",
    characteristics: "Automatic",
    AgencyId: 1,
  },
  {
    model: "7 Series",
    brand: "skoda",
    price: 70000,
    priceWeekly: 70000,
    priceMonthly: 60000,

    status: "available",
    horsePower: "523",
    typeOfFuel: "Gasoline",
    description: "Full-size luxury sedan with high-end features.",
    warrantyInsurance:500,
    deposit: 15,
    acceptation: "pending",
    typevehicle: "Economical",
    characteristics: "Automatic",
    AgencyId: 1,
  },
  {
    model: "7 Series",
    brand: "opel",
    price: 70000,
    priceWeekly: 70000,
    priceMonthly: 60000,

    status: "available",
    horsePower: "523",
    typeOfFuel: "Gasoline",
    description: "Full-size luxury sedan with high-end features.",
    warrantyInsurance:500,
    deposit: 15,
    acceptation: "pending",
    typevehicle: "Economical",
    characteristics: "Automatic",
    AgencyId: 1,
  },
  {
    model: "7 Series",
    brand: "suzuki",
    price: 70000,
    priceWeekly: 70000,
    priceMonthly: 60000,

    status: "available",
    horsePower: "523",
    typeOfFuel: "Gasoline",
    description: "Full-size luxury sedan with high-end features.",
    warrantyInsurance:500,
    deposit: 15,
    acceptation: "pending",
    typevehicle: "Economical",
    characteristics: "Automatic",
    AgencyId: 1,
  },
];

async function seedCars() {
  for (let car of cars) {
    await db.Car.create(car);
  }
}

seedCars().then(() => {
  console.log("Seed complete!");
  process.exit(0);
});
