const express = require('express')
const cors = require('cors');
const db = require('./db');
require('dotenv').config();


const app = express()

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());
const passport = require('./auth');
app.use(passport.initialize());

const logRequest = (req,res,next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to: ${req.originalUrl}`);
    next();
}
app.use(logRequest);

const localAuthMiddleware = passport.authenticate('local', {session: false});





// import the router file
const userRoutes = require('./routes/userRoutes');
const candidateRoutes = require('./routes/candidateRoutes');
const { getMaxListeners } = require('./models/user');
const User = require('./models/user');



// use the routers
app.use('/user', userRoutes);
app.use('/candidate', candidateRoutes);





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('listening on port 3000');
})
