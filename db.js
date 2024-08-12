const mongoose = require('mongoose');
require('dotenv').config();
const createAdminUser = require('./models/createAdminUser')
// define mongodb conection url
// const mongoURL = 'mongodb://0.0.0.0:27017/mydatabase'
const mongoURL = process.env.MONGODB_URL_LOCAL;
// const mongoURL = process.env.MONGODB_URL;

// set up mongodb connection
// mongoose.connect(mongoURL, {
//     useNewURLParser: true,
//     useUnifiedTopology: true
// })

mongoose.connect(mongoURL)
  .then(() => {
    console.log('Connected to the database');
    createAdminUser(); // Create admin user after the database is connected
  })

// get the default connection
// mongodb maintain a default connection object representing the mongodb connection
const db = mongoose.connection;


// define event listeners for database connection

db.on('connected', () => {
    console.log('>>>>> Connected to MongoDB server <<<<<<')
   
})


db.on('error', (err) => {
    console.log('MongoDB connection error:', err)
})

db.on('disconnected', () => {
    console.log('MongoDB disconnected')
})

// Export the database connection
module.exports = db