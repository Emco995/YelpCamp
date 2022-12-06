const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');


main().catch(err => console.log('CONNECTION ERROR', err));
async function main() {
    await mongoose.connect('mongodb://localhost:27017/emki-camp');
    console.log('MONGO CONNECTION OPEN')
}

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            author: '636799aa1fc3f831d91924d7',
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            description: 'lorem sad leaske sakd sarekas dkeakasd ksadeoqksad kskadasjkdjsadjsakd kasjdkasjdksaj djaskdjlasdlsadj asdjsakjd',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dwf1gglbw/image/upload/v1669456729/emkiCamp/steehvbo21fqll39jabr.avif',
                    filename: 'emkiCamp/steehvbo21fqll39jabr'
                },
                {
                    url: 'https://res.cloudinary.com/dwf1gglbw/image/upload/v1669456729/emkiCamp/jplruohfymlzfjzfqdvf.avif',
                    filename: 'emkiCamp/jplruohfymlzfjzfqdvf'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});