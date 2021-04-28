const { response } = require('express');
const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const Plant = require('../db/models/plant');
const { requireToken, isAdmin } = require('./gatekeepingmiddleware');
module.exports = router;

// /API/PLANTS shows active plants
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
// for alll plants on admin dashboard
router.get('/all', requireToken, isAdmin, async (req, res, next) => {
  try {
    const plants = await Plant.findAll();
    res.json(plants);
  } catch (err) {
    next(err);
  }
});
/*
Goal: If plant price is changed, then deactivate plant and create a new instance,
else update plant information
This will make our database have a plant history
*/
router.post('/update', requireToken, isAdmin, async (req, res, next) => {
  try {
    const { plantsList } = req.body;
    // list for plants with changed price
    const changedPricePlants = [];
    // list for plants with changed information excluding price
    const changedPlants = [];
    for (let i = 0; i < plantsList.length; i++) {
      const plant = await Plant.findByPk(plantsList[i].id);
      if (plant.price === plantsList[i].price * 100)
        changedPlants.push(plantsList[i]);
      else {
        changedPricePlants.push(plantsList[i]);
      }
    }
    // set plants with changed price to deactivate
    const changing = await Promise.all(
      changedPricePlants.map((plant) => {
        return Plant.update({ active: false }, { where: { id: plant.id } });
      })
    );

    // creates new plant instance for new priced plants
    await Promise.all(
      changedPricePlants.map((plant) => {
        return Plant.create({
          name: plant.name,
          species: plant.species,
          price: plant.price,
          imageURL: plant.imageURL,
          description: plant.description,
          quantity: plant.quantity,
        });
      })
    );
    // updates a plants information that didnt need a price change
    await Promise.all(
      changedPlants.map((plant) => {
        return Plant.update(plant, { where: { id: plant.id } });
      })
    );

    const plants = await Plant.findAll();
    // await plants.reload();
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
router.put('/:id', requireToken, isAdmin, async (req, res, next) => {
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
    // check if breaks but send status only
    // res.status(204).json(deleted);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});
