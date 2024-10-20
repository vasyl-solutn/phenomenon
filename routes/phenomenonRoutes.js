const express = require('express');
const router = express.Router();
const Phenomenon = require('../models/phenomenon');

// Create a new phenomenon
router.post('/', async (req, res) => {
  try {
    const phenomenon = new Phenomenon(req.body);
    await phenomenon.save();
    res.status(201).send(phenomenon);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all phenomena
router.get('/', async (req, res) => {
  try {
    const phenomena = await Phenomenon.find();
    res.send(phenomena);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a specific phenomenon
router.get('/:id', async (req, res) => {
  try {
    const phenomenon = await Phenomenon.findById(req.params.id)
      .populate('upwards')
      .populate('downwards');
    if (!phenomenon) {
      return res.status(404).send();
    }
    res.send(phenomenon);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a phenomenon
router.patch('/:id', async (req, res) => {
  try {
    const phenomenon = await Phenomenon.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!phenomenon) {
      return res.status(404).send();
    }
    res.send(phenomenon);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a phenomenon
router.delete('/:id', async (req, res) => {
  try {
    const phenomenon = await Phenomenon.findByIdAndDelete(req.params.id);
    if (!phenomenon) {
      return res.status(404).send();
    }
    res.send(phenomenon);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
