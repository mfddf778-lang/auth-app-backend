require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const ConnectDB = require('./config/dbConn');
const cors = require('cors');
const corsaptions = require('./config/corsOptn');
const cookieParser = require('cookie-parser');



const app = express();
const PORT = process.env.PORT || 5000;



// Connect to MongoDB   
ConnectDB();

// Middleware
app.use(cors(  
    corsaptions
));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/', require('./routs/root'));
app.use('/auth', require('./routs/authRouts'));
app.use('/users', require('./routs/userRout'));





// Start the server after successful DB connection
mongoose.connection.once('open', () => {
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})});
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});