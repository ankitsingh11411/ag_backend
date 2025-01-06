const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const dotenv = require('dotenv');

dotenv.config();

const seedAdmins = async () => {
  try {
    const admins = [
      {
        email: process.env.ADMIN_EMAIL_1,
        password: process.env.ADMIN_PASSWORD_1,
      },
      {
        email: process.env.ADMIN_EMAIL_2,
        password: process.env.ADMIN_PASSWORD_2,
      },
    ];

    for (const admin of admins) {
      const existingAdmin = await Admin.findOne({ email: admin.email });
      if (!existingAdmin) {
        await new Admin(admin).save();
      }
    }

    console.log('Admins seeded successfully.');
    process.exit();
  } catch (err) {
    console.error('Error seeding admins:', err);
    process.exit(1);
  }
};

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB.');
    seedAdmins();
  })
  .catch((err) => console.error('Failed to connect to MongoDB:', err));
