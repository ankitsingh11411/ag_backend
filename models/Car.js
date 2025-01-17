const mongoose = require('mongoose');

const carSchema = new mongoose.Schema(
  {
    brand: { type: String, required: true },
    model: { type: String, required: true },
    productionYear: { type: Number, required: true },
    endYear: { type: Number },
    topSpeed: { type: Number, required: true },
    horsepower: { type: Number, required: true },
    torque: { type: Number, required: true },
    image: { type: String },
    sounds: { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Car', carSchema);
