const multer = require('multer');
const path = require('path');

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir =
      file.fieldname === 'file' ? 'uploads/sounds' : 'uploads/images';
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter for valid formats
const fileFilter = (req, file, cb) => {
  const validExtensions = ['.jpg', '.jpeg', '.png', '.mp3', '.wav'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (!validExtensions.includes(ext)) {
    return cb(new Error('Invalid file type'), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 30 * 1920 * 1080 },
});

module.exports = upload;
