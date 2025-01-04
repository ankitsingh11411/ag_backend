const express = require('express');
const {
  addCar,
  getCars,
  getCarById,
  updateCar,
  deleteCar,
} = require('../controllers/carController');
const router = express.Router();
const upload = require('../middleware/upload');

// Add a new car
router.post('/add', upload.single('image'), addCar);

// Get all cars
router.get('/', getCars);

// Get a car by ID
router.get('/:id', getCarById);

// Update a car by ID
router.put('/:id', updateCar);

// Delete a car by ID
router.delete('/:id', deleteCar);

module.exports = router;
