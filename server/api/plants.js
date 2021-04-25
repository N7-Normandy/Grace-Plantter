const express = require('express');
const router = express.Router();
const Plant = require('../db/models/plant');
const User = require('../db/models/user');
module.exports = router;

// /API/PLANTS
router.get('/', async (req, res, next) => {
  try {
    const plants = await Plant.findAll({
      where: {
        active: true,
      },
    });
    res.json(plants);
  } catch (err) {
    next(err);
  }
});

// GET /api/plants/:plantId
router.get('/:plantId', async (req, res, next) => {
  try {
    const plant = await Plant.findByPk(req.params.plantId);
    res.json(plant);
  } catch (error) {
    next(error);
  }
});
