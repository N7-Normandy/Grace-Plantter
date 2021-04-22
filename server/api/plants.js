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

// PUT /api/plants/:plantId
router.put('/:plantId', async (req, res, next) => {
  try {
    const user = await User.findByPk(5);
    if (user) {
      await user.addToCart(req.body);
      res.send(await user.update(user));
      //   let cart = user.cart;
      //   cart.push(req.body);
      //   await user.update(user);
      //   res.send(user);
    }
  } catch (error) {
    next(error);
  }
});

// /API/PLANTS
router.get('/', async (req, res, next) => {
  try {
    const plants = await Plant.findAll();
    res.json(plants);
  } catch (err) {
    next(err);
  }
});
