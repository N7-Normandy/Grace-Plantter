const router = require('express').Router();
const {
	models: {User, Plant, Order},
} = require('../db');
//get cart
router.get('/', async (req, res, next) => {
	try {
		const user = await User.byToken(req.headers.authorization);
		res.json(user.cart.get());
	} catch (err) {
		next(err);
	}
});
//updat cart
router.put('/', async (req, res, next) => {
	try {
		const user = await User.byToken(req.headers.authorization);
		user = await user.update({cart: req.body});
		res.json(user.cart);
	} catch (err) {
		next(err);
	}
});
//checkout
router.post('/', async (req, res, next) => {
	try {
		let accepted = true;
		const user = await User.byToken(req.headers.authorization);
		//check if quantity is available
		cart = user.cart;
		for (let index = 0; index < cart.length; index++) {
			//search through every plant
			const plant = await Plant.findByPk(cart[index].id);
			//if cart has more than databse, accepted = false
			if (cart[index].quantity > plant.quantity) {
				accepted = false;
				break;
			} else {
				// reduce plant number in db
				const newQuantity = plant.quantity - cart[index].quantity;
				await plant.update({quantity: newQuantity});
			}
		}
		// if everything is acccepted, empty cart and update paste orders
		if (accepted) {
			await user.update({cart: []});
			res.json(
				await Order.create({
					plantsBought: user.cart,
					totalPrice: req.body.totalPrice,
					paymentType: req.body.paymentType,
				})
			);
		}
	} catch (err) {
		next(err);
	}
});
module.exports = router;
