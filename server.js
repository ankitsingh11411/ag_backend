const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const carRoutes = require('./routes/carRoutes');
const authRoutes = require('./routes/authRoutes');
const seedAdmins = require('./seedAdmins');
const path = require('path');

dotenv.config();

const app = express();

app.use(express.json());
const clienturl = process.env.CLIENT_URL || 'http://localhost:3000';

app.use(
  cors({
    origin: clienturl,
    credentials: true,
  })
);
app.use(bodyParser.json());

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected');
    await seedAdmins();
    console.log('Admin seeding completed.');
  })
  .catch((err) => console.error('Database connection or seeding error:', err));

app.get('/', (req, res) => {
  res.send('API running properly!');
});

app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

module.exports = app;
