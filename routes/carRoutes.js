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

router.get('/', getCars); // Public route
router.get('/:id', getCarById); // Public route

router.post('/add', verifyToken, isAdmin, upload.single('image'), addCar); // Admin only
router.put('/:id', verifyToken, isAdmin, updateCar); // Admin only
router.delete('/:id', verifyToken, isAdmin, deleteCar); // Admin only

router.get('/:id/sounds', verifyToken, getCarSounds);

router.post(
  '/:id/sounds',
  verifyToken,
  isAdmin,
  upload.single('file'),
  uploadCarSound
);

module.exports = router;
