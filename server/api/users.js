const router = require('express').Router();
const {
  models: { User, Order, Plant },
} = require('../db');

module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// PUT api/users/:userId/orders
router.put('/:userId/orders', async (req, res, next) => {
  try {
    let cart = await Order.findOne({
      where: {
        userId: req.params.userId,
        status: 'cart',
      },
      include: {
        model: Plant,
      },
    });
    if (!cart) {
      cart = await Order.create({ include: { model: Plant } });
      const user = await User.findByPk(req.params.userId);
      await user.setOrders(cart);
    }
    const plant = await Plant.findByPk(req.body.plantId);
    await plant.setOrders(cart, { through: { quantity: req.body.quantity } });
    await cart.update();
    res.json(cart);
  } catch (error) {
    next(error);
  }
});
