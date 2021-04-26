const express = require('express');
const router = express.Router();
const Plant = require('../db/models/plant');
const { requireToken, isAdmin } = require('./gatekeepingmiddleware')
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

router.post('/',requireToken, isAdmin, async (req, res, next) => {
  try {
    const plant = await Plant.create(req.body);
    res.json(plant);
  } catch (err) {
    next(err);
  }
});

router.put('/',requireToken, isAdmin, async (req, res, next) => {
  try {
    const updated = await Plant.update(
      req.body,
      { where: { id: req.body.id } }
    )
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id',requireToken, isAdmin, async (req, res, next) => {
  try {

    const deleted = await Plant.destroy({where: {id: req.params.id}});
    res.json(deleted);
  } catch (err) {
    next(err);
  }
});
