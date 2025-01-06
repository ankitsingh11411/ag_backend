const express = require('express');
const {
  adminLogin,
  registerAdmin,
} = require('../controllers/adminAuthController');

const router = express.Router();

router.post('/admin/login', adminLogin);

router.post('/admin/register', registerAdmin);

module.exports = router;
