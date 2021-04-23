const router = require('express').Router();
const {
	models: {User, Plant, Order},
} = require('../db');
//get cart
let myCart = [
	{
		plant: {
			id: 1,
			name: 'Orchid',
			price: 120,
			imageUrl:
				'https://images.thdstatic.com/productImages/e154a248-ac84-46bf-a1a9-65724e122958/svn/endless-summer-bushes-14750-64_400.jpg',
		},
		quantity: 2,
	},
	{
		plant: {
			id: 2,
			name: 'Peony',
			price: 18.95,
			imageUrl:
				' https://images.thdstatic.com/productImages/b33f34d0-8f91-4e49-a1d8-2eaab0012500/svn/proven-winners-bushes-14766-64_100.jpg',
		},
		quantity: 12,
	},
];
router.get('/', async (req, res, next) => {
	try {
		// const user = await User.byToken(req.headers.authorization);
		// const myCart = []
		// user.cart.forEach(plant => {
		// 	const plant = await Plant.findByPk(plant);
		// 	myCart.push(plant)
		// });
		res.json(myCart);
	} catch (err) {
		next(err);
	}
});
//update cart
// see empty
//remove something from myCart
router.put('/', async (req, res, next) => {
	try {
		myCart = req.body;
		res.json(myCart);
		// const user = await User.byToken(req.headers.authorization);
		// user = await user.update({cart: req.body});
		// res.json(user.cart);
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
		const id = req.body.id
		myCart = myCart.filter(item => {
			return id !== item.plant.id;
		})
		console.log("sending response back", myCart)
		res.json(myCart);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
