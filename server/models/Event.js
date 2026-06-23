const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true }, // e.g., 'workshop', 'hackathon'
  description: { type: String, required: true },
  date: { type: Date, required: true },
  venue: { type: String, required: true },
  registrationLink: { type: String },
  organizer: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', eventSchema);