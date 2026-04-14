const express = require('express');
const Rsvp = require('../models/Rsvp');
const router = express.Router();

// POST /api/rsvp - Submit RSVP
router.post('/', async (req, res) => {
  try {
    const { name, phone, guests, attending, message } = req.body;
    
    // Basic validation
    if (!name || !phone || !guests || !attending) {
      return res.status(400).json({ error: 'Please provide all required fields.' });
    }

    const rsvp = new Rsvp({ name, phone, guests, attending, message });
    await rsvp.save();
    
    res.status(201).json({ message: 'RSVP saved successfully!', rsvp });
  } catch (error) {
    console.error('Error saving RSVP:', error);
    res.status(500).json({ error: 'Server error saving RSVP.', details: error.message });
  }
});

// GET /api/rsvp - Get all RSVPs (Admin)
router.get('/', async (req, res) => {
  try {
    const rsvps = await Rsvp.find().sort({ createdAt: -1 });
    res.status(200).json(rsvps);
  } catch (error) {
    console.error('Error fetching RSVPs:', error);
    res.status(500).json({ error: 'Server error fetching RSVPs.' });
  }
});

// DELETE /api/rsvp/:id - Delete an RSVP (Admin)
router.delete('/:id', async (req, res) => {
  try {
    const deletedRsvp = await Rsvp.findByIdAndDelete(req.params.id);
    if (!deletedRsvp) {
      return res.status(404).json({ error: 'RSVP not found.' });
    }
    res.status(200).json({ message: 'RSVP deleted successfully.' });
  } catch (error) {
    console.error('Error deleting RSVP:', error);
    res.status(500).json({ error: 'Server error deleting RSVP.' });
  }
});

module.exports = router;
