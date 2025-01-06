const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const carRoutes = require('./routes/carRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Database connection error:', err));

app.get('/', (req, res) => {
  res.send('API running properly!');
});

app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/uploads', express.static('uploads'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
