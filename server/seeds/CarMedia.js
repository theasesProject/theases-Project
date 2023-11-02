
'use strict';

const { db } = require('../models/index'); // Adjust the path to your models

const carMediaData = [
    {
        "id": 1,
        "media": ["https://www.pexels.com/search/car/", "https://www.pexels.com/search/car/", "https://www.pexels.com/search/car/", "https://www.pexels.com/search/car/"]
    },
    {
        "id": 2,
        "media": ["https://unsplash.com/wallpapers/cars", "https://unsplash.com/wallpapers/cars", "https://unsplash.com/wallpapers/cars", "https://unsplash.com/wallpapers/cars"]
    },
    {
        "id": 3,
        "media": ["https://pixabay.com/images/search/car/", "https://pixabay.com/images/search/car/", "https://pixabay.com/images/search/car/", "https://pixabay.com/images/search/car/"]
    },
    {
        "id": 4,
        "media": ["https://pixabay.com/images/search/car/", "https://pixabay.com/images/search/car/", "hhttps://pixabay.com/images/search/car/", "https://pixabay.com/images/search/car/"]
    },
    {
        "id": 5,
        "media": ["https://www.pexels.com/search/car/", "https://www.pexels.com/search/car/", "https://www.pexels.com/search/car/", "https://www.pexels.com/search/car/"]
    },
    {
        "id": 6,
        "media": ["https://www.pexels.com/search/car/", "https://www.pexels.com/search/car/", "https://www.pexels.com/search/car/", "https://www.pexels.com/search/car/"]
    },
    {
        "id": 7,
        "media": ["https://unsplash.com/wallpapers/cars", "https://unsplash.com/wallpapers/cars", "https://unsplash.com/wallpapers/cars", "https://unsplash.com/wallpapers/cars"]
    },
    {
        "id": 8,
        "media": ["https://unsplash.com/wallpapers/cars", "https://unsplash.com/wallpapers/cars", "https://unsplash.com/wallpapers/cars", "https://unsplash.com/wallpapers/cars"]
    },
    {
        "id": 9,
        "media": ["https://unsplash.com/wallpapers/cars", "https://unsplash.com/wallpapers/cars", "https://unsplash.com/wallpapers/cars", "https://unsplash.com/wallpapers/cars"]
    },
    {
        "id": 10,
        "media": ["https://www.istockphoto.com/photos/car", "https://www.istockphoto.com/photos/car", "https://www.istockphoto.com/photos/car", "https://www.istockphoto.com/photos/car"]
    }
]

async function seedCarMedia() {
    for (let carMedia of carMediaData) {
        for (let media of carMedia.media) {
            await db.CarMedia.create({
                media: media,
                carId: carMedia.id
            });
        }
    }
}

seedCarMedia().then(() => {
    console.log('CarMedia seed complete!');
    process.exit(0);
});
