const express = require('express');
const {
  addCar,
  getCars,
  getCarById,
  updateCar,
  deleteCar,
  getCarSounds,
  uploadCarSound,
} = require('../controllers/carController');
const upload = require('../middleware/upload');
const { verifyToken, isAdmin } = require('../middleware/auth');
const router = express.Router();

router.get('/', getCars);
router.get('/:id', getCarById);

router.post('/add', verifyToken, isAdmin, upload.single('image'), addCar);
router.put('/:id', verifyToken, isAdmin, updateCar);
router.delete('/:id', verifyToken, isAdmin, deleteCar);

router.get('/:id/sounds', verifyToken, getCarSounds);

router.post(
  '/:id/sounds',
  verifyToken,
  isAdmin,
  upload.single('file'),
  uploadCarSound
);

module.exports = router;
