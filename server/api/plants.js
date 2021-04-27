const { response } = require('express');
const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const Plant = require('../db/models/plant');
const { requireToken, isAdmin } = require('./gatekeepingmiddleware');
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

// GET filtered plants
router.get('/search', async (req, res, next) => {
  try {
    const { like } = req.query;
    const plants = await Plant.findAll({
      where: {
        active: true,
        [Op.or]: [
          {
            name: {
              [Op.iLike]: `%${like}%`,
            },
          },
          {
            description: {
              [Op.iLike]: `%${like}%`,
            },
          },
        ],
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

router.post('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const plant = await Plant.create(req.body);
    res.json(plant);
  } catch (err) {
    next(err);
  }
});

// requireToken, isAdmin,
router.put('/:id', async (req, res, next) => {
  try {
    const oldPlant = await Plant.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!oldPlant.active) {
      throw new Error('Please update an active listing.');
    }

    const { name, species, price, imageURL, description, quantity } = oldPlant;
    const whereStatement = {
      name,
      species,
      price,
      imageURL,
      description,
      quantity,
      ...req.body,
    };

    const [old, [newPlant, created]] = await Promise.all([
      oldPlant.update({ active: false }),
      Plant.findOrCreate({
        where: whereStatement,
      }),
    ]);

    if (!created) await newPlant.update({ active: true });

    res.json(newPlant);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', requireToken, isAdmin, async (req, res, next) => {
  try {
    const deleted = await Plant.destroy({ where: { id: req.params.id } });
    //check if breaks but send status only
    // res.status(204).json(deleted);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});
