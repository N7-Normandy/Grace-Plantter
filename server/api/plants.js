const router = require('express').Router();
const {
  models: { Plant },
} = require('../db');

module.exports = router;

// /API/PLANTS
router.get('/', async (req, res, next) => {
  try {
    const plants = await Plant.findAll();
    res.json(plants);
  } catch (err) {
    next(err);
  }
});
