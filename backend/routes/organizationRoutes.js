const express = require('express');
const authMiddleware = require('../middleware/authMiddleWare');
const router = express.Router();

const Organization = require('../models/Organization');

// Create Organization
router.post('/',authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;

    const organization = await Organization.create({
      name,
    });

    res.status(201).json(organization);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get All Organizations
router.get('/',authMiddleware, async (req, res) => {
  try {
    const organizations = await Organization.find();

    res.status(200).json(organizations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get Single Organization
router.get('/:id',authMiddleware, async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id);

    if (!organization) {
      return res.status(404).json({
        message: 'Organization not found',
      });
    }

    res.status(200).json(organization);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Update Organization
router.put('/:id',authMiddleware, async (req, res) => {
  try {
    const organization = await Organization.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!organization) {
      return res.status(404).json({
        message: 'Organization not found',
      });
    }

    res.status(200).json(organization);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Delete Organization
router.delete('/:id',authMiddleware, async (req, res) => {
  try {
    const organization = await Organization.findByIdAndDelete(
      req.params.id
    );

    if (!organization) {
      return res.status(404).json({
        message: 'Organization not found',
      });
    }

    res.status(200).json({
      message: 'Organization deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;