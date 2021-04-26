const router = require('express').Router();
const {
  models: { User, Plant, Order },
} = require('../db');

module.exports = router;

// get cart
router.get('/:userId', async (req, res, next) => {
<<<<<<< HEAD
  try {
    let cart = await Order.findOne({
      where: {
        userId: req.params.userId,
        status: 'cart',
      },
      include: {
        model: Plant,
        order: [['plants.orderProducts.createdAt', 'ASC']],
      },
    });
    res.json(cart);
  } catch (err) {
    next(err);
  }
});
// update cart
router.put('/:userId', async (req, res, next) => {
  try {
    const changedPlant = await Plant.findByPk(req.body.plant.id);
    const cart = await Order.findOne({
      where: {
        userId: req.params.userId,
        status: 'cart',
      },
      include: {
        model: Plant,
        order: [['plants.orderProducts.createdAt', 'ASC']],
      },
    });
    await cart.addPlant(changedPlant, {
      through: { quantity: req.body.plant.orderProducts.quantity },
    });
    await cart.reload();
    res.json(cart);
  } catch (err) {
    next(err);
  }
});
router.put('/:userId/remove', async (req, res, next) => {
  try {
    const oldPlant = await Plant.findByPk(req.body.plantId);
    const cart = await Order.findOne({
      where: {
        userId: req.params.userId,
        status: 'cart',
      },
      include: {
        model: Plant,
        order: [['plants.orderProducts.createdAt', 'ASC']],
      },
    });
    await cart.removePlant(oldPlant);
    await cart.reload();
    res.json(cart);
  } catch (err) {
    next(err);
  }
});
//checkout
router.post('/:userId', async (req, res, next) => {
  try {
    let accepted = true;
    // const user = await User.byToken(req.headers.authorization);
    //check if quantity is available
    let cart = await Order.findOne({
      where: {
        userId: req.params.userId,
        status: 'cart',
      },
      include: {
        model: Plant,
        order: [['plants.orderProducts.createdAt', 'ASC']],
      },
    });

    let plants = [];

    for (let index = 0; index < cart.length; index++) {
      // search through every plant
      const plant = await Plant.findByPk(cart[index].plant.id);
      // if cart has more than databse, accepted = false
      if (cart[index].plant.quantity > plant.quantity) {
        accepted = false;
        break;
      } else {
        plants.push(plant);
        // reduce plant number in db
        // const newQuantity = plant.quantity - cart[index].plant.quantity;
        // await plant.update({ quantity: newQuantity });
      }
    }
    // if everything is acccepted, empty cart and update paste orders
    if (accepted) {
      Promise.all(
        plants.map((pla, idx) => {
          const newQuantity =
            pla.quantity - cart.plants[idx].orderProducts.quantity;
          return pla.update({ quantity: newQuantity });
        })
      );

      await user.update({ cart: [] });
      res.json(
        await Order.create({
          plantsBought: cart,
          totalPrice: req.body.totalPrice,
          paymentType: req.body.paymentType,
        })
      );
    }
  } catch (err) {
    next(err);
  }
=======
	try {
		let cart = await Order.findOne({
			where: {
				userId: req.params.userId,
				status: 'cart',
			},
			include: {
				model: Plant,
				order: [['plants.name', 'ASC']],
			},
		});
		res.json(cart);
	} catch (err) {
		next(err);
	}
});
// update cart
router.put('/:userId', async (req, res, next) => {
	try {
		const changedPlant = await Plant.findByPk(req.body.plant.id);
		const cart = await Order.findOne({
			where: {
				userId: req.params.userId,
				status: 'cart',
			},
			include: {
				model: Plant,
				order: [['plants.name', 'ASC']],
			},
		});
		await cart.addPlant(changedPlant, {
			through: {quantity: req.body.plant.orderProducts.quantity},
		});
		await cart.reload();
		res.json(cart);
	} catch (err) {
		next(err);
	}
});
router.put('/:userId/remove', async (req, res, next) => {
	try {
		const oldPlant = await Plant.findByPk(req.body.plantId);
		const cart = await Order.findOne({
			where: {
				userId: req.params.userId,
				status: 'cart',
			},
			include: {
				model: Plant,
				order: [['plants.name', 'ASC']],
			},
		});
		await cart.removePlant(oldPlant);
		await cart.reload();
		res.json(cart);
	} catch (err) {
		next(err);
	}
});
//checkout
router.post('/:userId/checkout', async (req, res, next) => {
	try {
		//total payment

		//
		//check if quantity is available
		const cart = await Order.findOne({
			where: {
				userId: req.params.userId,
				status: 'cart',
			},
			include: {
				model: Plant,
				order: [['plants.name', 'ASC']],
			},
		});

		const total =
			cart.plants.reduce((acc, curr) => {
				return acc + curr.price * curr.orderProducts.quantity;
			}, 0) / 100;

		let inStock = true;
		const plants = [];
		for (let index = 0; index < cart.plants.length; index++) {
			//search through every plant
			const plant = await Plant.findByPk(cart.plants[index].id);
			//if cart has more than databse, inStock = false
			if (cart.plants[index].orderProducts.quantity > plant.quantity) {
				inStock = false;
				break;
			} else {
				plants.push(plant);
			}
		}
		console.log('inStock', inStock);
		// if everything is acccepted, empty cart and update paste orders
		if (inStock) {
			await Promise.all(
				plants.map((pla, idx) => {
					const newQuantity =
						pla.quantity - cart.plants[idx].orderProducts.quantity;
					return pla.update({quantity: newQuantity});
				})
			);
			await cart.update({status: 'purchased', totalPrice: total});
			res.sendStatus('200');
		} else {
			res.sendStatus('555');
		}
	} catch (err) {
		next(err);
	}
>>>>>>> main
});
