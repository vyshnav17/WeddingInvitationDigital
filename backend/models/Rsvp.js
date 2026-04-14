const mongoose = require('mongoose');

const RsvpSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  guests: { type: Number, required: true, min: 0 },
  attending: { type: String, enum: ['Yes', 'No'], required: true },
  message: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Rsvp', RsvpSchema);
