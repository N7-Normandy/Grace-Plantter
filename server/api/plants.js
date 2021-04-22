const express = require('express');
const router = express.Router();
const Plant = require('../db/models/plant');
const User = require('../db/models/user');
module.exports = router;

// GET /api/plants/:plantId
router.get('/:plantId', async (req, res, next) => {
  try {
    const plant = await Plant.findByPk(req.params.plantId);
    res.json(plant);
  } catch (error) {
    next(error);
  }
});

// POST /api/plants/:plantId
router.post('/:plantId', async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
