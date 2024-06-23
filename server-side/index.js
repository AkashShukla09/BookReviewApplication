const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors'); 
require('dotenv').config();




// Import routes
// const users = require('./routes/users');
const auth = require('./routes/auth');
const books = require('./routes/books');
const reviews = require('./routes/reviews');
const favorites = require('./routes/favorites');

const app = express();

// Connect Database
connectDB();

// Init Middleware 
app.use(express.json({ extended: false }));
app.use(cors());

// Define Routes
// app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/books', books);
app.use('/api/reviews', reviews);
app.use('/api/favorites', favorites);


const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
