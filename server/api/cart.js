const router = require('express').Router();
const {
	models: {User, Plant, Order},
} = require('../db');

module.exports = router;

// get cart
router.get('/:userId', async (req, res, next) => {
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
router.put('/:userId/update', async (req, res, next) => {
	try {
		const {plant, quantity} = req.query;
		const changedPlant = await Plant.findByPk(plant);
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
			through: {quantity: quantity},
		});
		await cart.reload();
		res.json(cart);
	} catch (err) {
		next(err);
	}
});
router.put('/:userId/remove', async (req, res, next) => {
	try {
		const oldPlant = await Plant.findByPk(req.query.plantId);
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
		const plantsInCart = cart.plants;
		const total =
			plantsInCart.reduce((acc, curr) => {
				return acc + curr.price * curr.orderProducts.quantity;
			}, 0) / 100;

		let inStock = true;
		const plants = [];

		for (let index = 0; index < plantsInCart.length; index++) {
			//search through every plant
			const plant = await Plant.findByPk(plantsInCart[index].id);
			//if cart has more than databse, inStock = false
			if (plantsInCart[index].orderProducts.quantity > plant.quantity) {
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
						pla.quantity - plantsInCart[idx].orderProducts.quantity;
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
});
