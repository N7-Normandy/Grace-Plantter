const router = require('express').Router();
const {
	models: {User, Plant, Order},
} = require('../db');

module.exports = router;

//get cart
router.get('/:userId', async (req, res, next) => {
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
		res.json(cart);
	} catch (err) {
		next(err);
	}
});
//update cart
router.put('/:userId', async (req, res, next) => {
	try {
		console.log(req.body.plant);
		const oldPlant = await Plant.findByPk(req.body.plant.id);
		const cart = await Order.findOne({
			where: {
				userId: req.params.userId,
				status: 'cart',
			},
			include: {
				model: Plant,
			},
		});
		await cart.removePlant(oldPlant);
		await cart.addPlant(oldPlant, {
			through: {quantity: req.body.plant.orderProducts.quantity},
		});
		res.json(cart);
	} catch (err) {
		next(err);
	}
});
//checkout
router.post('/', async (req, res, next) => {
	try {
		let accepted = true;
		// const user = await User.byToken(req.headers.authorization);
		//check if quantity is available
		let cart = myCart;
		for (let index = 0; index < cart.length; index++) {
			//search through every plant
			const plant = await Plant.findByPk(cart[index].plant.id);
			//if cart has more than databse, accepted = false
			if (cart[index].plant.quantity > plant.quantity) {
				accepted = false;
				break;
			} else {
				// reduce plant number in db
				const newQuantity = plant.quantity - cart[index].plant.quantity;
				await plant.update({quantity: newQuantity});
			}
		}
		// if everything is acccepted, empty cart and update paste orders
		if (accepted) {
			await user.update({cart: []});
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
});

router.put('/remove', async (req, res, next) => {
	try {
		const id = req.body.id;
		myCart = myCart.filter(item => {
			return id !== item.plant.id;
		});
		console.log('sending response back', myCart);
		res.json(myCart);
	} catch (err) {
		next(err);
	}
});