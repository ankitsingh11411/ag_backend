const Car = require('../models/Car');

// Add a new car
const addCar = async (req, res) => {
  try {
    const {
      brand,
      model,
      productionYear,
      endYear,
      topSpeed,
      horsepower,
      torque,
    } = req.body;
    const image = req.file ? req.file.path : null; // Get the image path from Multer

    const car = new Car({
      brand,
      model,
      productionYear,
      endYear,
      topSpeed,
      horsepower,
      torque,
      image,
    });

    await car.save();
    res.status(201).json(car);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add car', details: err.message });
  }
};

// Get all cars
const getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Failed to fetch cars', details: err.message });
  }
};

// Get a car by ID
const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.status(200).json(car);
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Failed to fetch car', details: err.message });
  }
};

// Update a car by ID
const updateCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.status(200).json(car);
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Failed to update car', details: err.message });
  }
};

// Delete a car by ID
const deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.status(200).json({ message: 'Car deleted successfully' });
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Failed to delete car', details: err.message });
  }
};

module.exports = { addCar, getCars, getCarById, updateCar, deleteCar };
