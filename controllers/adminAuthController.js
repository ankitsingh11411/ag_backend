const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

// Admin login
const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res
        .status(401)
        .json({ error: 'Invalid credentials: Admin not found' });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ error: 'Invalid credentials: Password mismatch' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: admin._id, role: 'admin' }, // Include role in the token payload
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({ token, message: 'Admin logged in successfully' });
  } catch (err) {
    console.error('Login Error:', err.message);
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
};

// Register an admin (optional, for seeding new admins)
const registerAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the admin
    const admin = new Admin({ email, password: hashedPassword });
    await admin.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    console.error('Registration Error:', err.message);
    res
      .status(500)
      .json({ error: 'Registration failed', details: err.message });
  }
};

module.exports = { adminLogin, registerAdmin };
