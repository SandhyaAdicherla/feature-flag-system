const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleWare');
const FeatureFlag = require('../models/FeatureFlag');

router.post('/',authMiddleware, async (req, res) => {
  try {
    const {
      featureKey,
      enabled,
      organizationId
    } = req.body;

    const feature = await FeatureFlag.create({
      featureKey,
      enabled,
      organizationId
    });

    res.status(201).json(feature);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.get('/:organizationId',authMiddleware, async (req, res) => {
  try {

    const features = await FeatureFlag.find({
      organizationId: req.params.organizationId
    });

    res.status(200).json(features);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.put('/:id',authMiddleware, async (req, res) => {
  try {

    const feature = await FeatureFlag.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(feature);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.delete('/:id',authMiddleware, async (req, res) => {
  try {

    await FeatureFlag.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: 'Feature deleted successfully'
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.post('/check', async (req, res) => {
  try {

    const {
      organizationId,
      featureKey
    } = req.body;

    const feature = await FeatureFlag.findOne({
      organizationId,
      featureKey
    });

    if (!feature) {
      return res.status(200).json({
        enabled: false
      });
    }

    res.status(200).json({
      enabled: feature.enabled
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;