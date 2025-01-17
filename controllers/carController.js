const Car = require('../models/Car');

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
    const image = req.file ? req.file.path : null;

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

const uploadCarSound = async (req, res) => {
  try {
    const carId = req.params.id;
    const soundFile = req.file ? req.file.path : null;

    if (!soundFile) {
      return res.status(400).json({ error: 'No sound file uploaded' });
    }

    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }

    car.sounds.push(soundFile);
    await car.save();

    res.status(200).json({
      message: 'Sound file uploaded successfully',
      sounds: car.sounds,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Failed to upload car sound', details: err.message });
  }
};

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

const getCarSounds = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }

    const sounds = car.sounds || [];
    res.status(200).json({ sounds });
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Failed to fetch car sounds', details: err.message });
  }
};

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

module.exports = {
  addCar,
  getCars,
  getCarById,
  getCarSounds,
  updateCar,
  deleteCar,
  uploadCarSound,
};
