const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelpcamp2020', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random50 = Math.floor(Math.random() * 50);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '5fbf30c77eb069122455cf11',
            location: `${cities[random50].city}, ${cities[random50].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem, quaerat? Dicta quo quod at aut, mollitia voluptate harum tempora veniam voluptatum, sed maiores ex eius consequatur dignissimos placeat nihil repellat rerum, perspiciatis optio. Voluptatibus architecto excepturi nam impedit odio atque nisi! Debitis dignissimos alias veritatis odit quae laudantium ratione qui.',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dzlnbmzht/image/upload/v1606794353/YelpCamp/tucv4gjyxnrsij34lgsg.png',
                    filename: 'YelpCamp/tucv4gjyxnrsij34lgsg'
                },
                {
                    url: 'https://res.cloudinary.com/dzlnbmzht/image/upload/v1606794353/YelpCamp/tdbvsaqpo1y0pjt2xoz6.png',
                    filename: 'YelpCamp/tdbvsaqpo1y0pjt2xoz6'
                },
                {
                    url: 'https://res.cloudinary.com/dzlnbmzht/image/upload/v1606794352/YelpCamp/wcvmjtovdh1k3qrkwqkx.png',
                    filename: 'YelpCamp/wcvmjtovdh1k3qrkwqkx'
                }
            ]
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});