const router = require('express').Router();
const {
  models: { User, Order },
} = require('../db');

module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
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

router.get('/:id/orders/filter', async (req, res, next) => {
  try {
    const { limit, order } = req.query;
    let limitNum = Infinity;
    let orderStatement = [];
    if (limit) {
      limitNum = limit;
    }

    if (order) {
      orderStatement = order.split(' ');
    }

    const userOrder = Order.findAll({
      limit: +limitNum,
      order: orderStatement,
      where: {},
    });
  } catch (error) {
    next(error);
  }
});
