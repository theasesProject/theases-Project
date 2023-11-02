'use strict';

const { db } = require('../models/index'); // Adjust the path to your models

const cars = [
    {
        "model": "Model S",
        "brand": "Tesla",
        "price": 80000,
        "period": "daily",
        "status": "available",
        "horsePower": "670",
        "typeOfFuel": "Electric",
        "description": "Luxury electric sedan with long range.",
        "deposit": 10, // 10% of the car's price
        "acceptation": "pending",
        "typevehicle": "Luxury",
        "characteristics": "Automatic"
    },
    {
        "model": "3 Series",
        "brand": "BMW",
        "price": 40000,
        "period": "weekly",
        "status": "available",
        "horsePower": "255",
        "typeOfFuel": "Gasoline",
        "description": "Compact luxury sedan with sporty performance.",
        "deposit": 15, // 15% of the car's price
        "acceptation": "pending",
        "typevehicle": "Economical",
        "characteristics": "Automatic"
    }, {
        "model": "Model S",
        "brand": "Tesla",
        "price": 80000,
        "period": "daily",
        "status": "available",
        "horsePower": "670",
        "typeOfFuel": "Electric",
        "description": "Luxury electric sedan with long range.",
        "deposit": 10,
        "acceptation": "pending",
        "typevehicle": "Luxury",
        "characteristics": "Automatic"
    },
    {
        "model": "3 Series",
        "brand": "BMW",
        "price": 40000,
        "period": "weekly",
        "status": "available",
        "horsePower": "255",
        "typeOfFuel": "Gasoline",
        "description": "Compact luxury sedan with sporty performance.",
        "deposit": 15,
        "acceptation": "pending",
        "typevehicle": "Economical",
        "characteristics": "Automatic"
    },
    {
        "model": "Model X",
        "brand": "Tesla",
        "price": 90000,
        "period": "daily",
        "status":
            "available",
        "horsePower": "1020",
        "typeOfFuel": "Electric",
        "description": "Luxury electric SUV with exceptional performance.",
        "deposit": 10,
        "acceptation": "pending",
        "typevehicle": "Luxury",
        "characteristics": "Automatic"
    },
    {
        "model": "5 Series",
        "brand": "BMW",
        "price": 50000,
        "period": "weekly",
        "status": "available",
        "horsePower": "335",
        "typeOfFuel": "Gasoline",
        "description": "Midsize luxury sedan with sporty performance.",
        "deposit": 15,
        "acceptation": "pending",
        "typevehicle": "Economical",
        "characteristics": "Automatic"
    },
    {
        "model": "Model Y",
        "brand": "Tesla",
        "price": 60000,
        "period": "daily",
        "status": "available",
        "horsePower": "456",
        "typeOfFuel": "Electric",
        "description": "Compact luxury electric SUV with long range.",
        "deposit": 10,
        "acceptation": "pending",
        "typevehicle": "Luxury",
        "characteristics": "Automatic"
    },
    {
        "model": "7 Series",
        "brand": "BMW",
        "price": 70000,
        "period": "weekly",
        "status": "available",
        "horsePower": "523",
        "typeOfFuel": "Gasoline",
        "description": "Full-size luxury sedan with high-end features.",
        "deposit": 15,
        "acceptation": "pending",
        "typevehicle": "Economical",
        "characteristics": "Automatic"
    }
    // Add more cars here...
];

async function seedCars() {
    for (let car of cars) {
        await db.Car.create(car);
    }
}

seedCars().then(() => {
    console.log('Seed complete!');
    process.exit(0);
});
