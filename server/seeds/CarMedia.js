
'use strict';

const { db } = require('../models/index'); // Adjust the path to your models

const carMediaData = [
    {
        "id": 1,
        "media": ["https://www.pexels.com/search/car/", "https://www.pexels.com/search/car/", "https://www.pexels.com/search/car/", "https://www.pexels.com/search/car/"],"CarId":1
    },
    {
        "id": 2,
        "media": ["https://unsplash.com/wallpapers/cars", "https://unsplash.com/wallpapers/cars", "https://unsplash.com/wallpapers/cars", "https://unsplash.com/wallpapers/cars"],"CarId":11
    },
    {
        "id": 3,
        "media": ["https://pixabay.com/images/search/car/", "https://pixabay.com/images/search/car/", "https://pixabay.com/images/search/car/", "https://pixabay.com/images/search/car/"],"CarId":9
    },
    {
        "id": 4,
        "media": ["https://pixabay.com/images/search/car/", "https://pixabay.com/images/search/car/", "hhttps://pixabay.com/images/search/car/", "https://pixabay.com/images/search/car/"],"CarId":10
    },
    {
        "id": 5,
        "media": ["https://www.pexels.com/search/car/", "https://www.pexels.com/search/car/", "https://www.pexels.com/search/car/", "https://www.pexels.com/search/car/"],"CarId":4
    },
    {
        "id": 6,
        "media": ["https://www.pexels.com/search/car/", "https://www.pexels.com/search/car/", "https://www.pexels.com/search/car/", "https://www.pexels.com/search/car/"],"CarId":5
    },
    {
        "id": 7,
        "media": ["https://unsplash.com/wallpapers/cars", "https://unsplash.com/wallpapers/cars", "https://unsplash.com/wallpapers/cars", "https://unsplash.com/wallpapers/cars"],"CarId":6
    },
    {
        "id": 8,
        "media": ["https://unsplash.com/wallpapers/cars", "https://unsplash.com/wallpapers/cars", "https://unsplash.com/wallpapers/cars", "https://unsplash.com/wallpapers/cars"],"CarId":17
    },
    {
        "id": 9,
        "media": ["https://unsplash.com/wallpapers/cars", "https://unsplash.com/wallpapers/cars", "https://unsplash.com/wallpapers/cars", "https://unsplash.com/wallpapers/cars"],"CarId":7
    },
    {
        "id": 10,
        "media": ["https://www.istockphoto.com/photos/car", "https://www.istockphoto.com/photos/car", "https://www.istockphoto.com/photos/car", "https://www.istockphoto.com/photos/car"],"CarId":8
    },
    {
        "id": 11,
        "media": ["https://www.istockphoto.com/photos/car", "https://www.istockphoto.com/photos/car", "https://www.istockphoto.com/photos/car", "https://www.istockphoto.com/photos/car"],"CarId":12
    },
    {
        "id": 12,
        "media": ["https://www.istockphoto.com/photos/car", "https://www.istockphoto.com/photos/car", "https://www.istockphoto.com/photos/car", "https://www.istockphoto.com/photos/car"],"CarId":13
    },
    {
        "id": 13,
        "media": ["https://www.istockphoto.com/photos/car", "https://www.istockphoto.com/photos/car", "https://www.istockphoto.com/photos/car", "https://www.istockphoto.com/photos/car"],"CarId":14
    },
    {
        "id": 14,
        "media": ["https://www.istockphoto.com/photos/car", "https://www.istockphoto.com/photos/car", "https://www.istockphoto.com/photos/car", "https://www.istockphoto.com/photos/car"],"CarId":15
    },
    {
        "id": 15,
        "media": ["https://www.istockphoto.com/photos/car", "https://www.istockphoto.com/photos/car", "https://www.istockphoto.com/photos/car", "https://www.istockphoto.com/photos/car"],"CarId":16
    },
    {
        "id": 16,
        "media": ["https://www.pexels.com/search/car/", "https://www.pexels.com/search/car/", "https://www.pexels.com/search/car/", "https://www.pexels.com/search/car/"],"CarId":2
    },
    {
        "id": 18,
        "media": ["https://www.pexels.com/search/car/", "https://www.pexels.com/search/car/", "https://www.pexels.com/search/car/", "https://www.pexels.com/search/car/"],"CarId":3
    },
    {
        "id": 18,
        "media": ["https://www.pexels.com/search/car/", "https://www.pexels.com/search/car/", "https://www.pexels.com/search/car/", "https://www.pexels.com/search/car/"],"CarId":20
    },
    {
        "id": 19,
        "media": ["https://www.pexels.com/search/car/", "https://www.pexels.com/search/car/", "https://www.pexels.com/search/car/", "https://www.pexels.com/search/car/"],"CarId":18
    },
    {
        "id": 20,
        "media": ["https://www.pexels.com/search/car/", "https://www.pexels.com/search/car/", "https://www.pexels.com/search/car/", "https://www.pexels.com/search/car/"],"CarId":19
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
