import axios from 'axios';
//Action types
const GET_CART = 'GET_CART';
const UPDATE_CART = 'UPDATE_CART';
const CHECKOUT_CART = 'CHECKOUT_CART';

//Actions creators
const getCart = cart => ({
	type: GET_CART,
	cart,
});
const updateCart = cart => ({
	type: UPDATE_CART,
	cart,
});
const checkoutCart = cart => ({
	type: CHECKOUT_CART,
	cart,
});

//Thunk creators
export const fetchCart = () => {
	return async dispatch => {
		const {data: userCart} = await axios.get('/api/cart');
		console.log(userCart);
		dispatch(getCart(userCart));
	};
};
export const getUpdateCart = cart => {
	return async dispatch => {
		const {data: userCart} = await axios.put('/api/cart', cart);
		dispatch(updateCart(userCart));
	};
};
export const getCheckoutCart = cart => {
	return async dispatch => {
		const {data: order} = await axios.post('/api/cart', cart);
		dispatch(checkoutCart(order));
	};
};

// Reducer
export default (state = [], action) => {
	switch (action.type) {
		case GET_CART:
			return action.cart;
		case UPDATE_CART:
			return state.map(project => {
				return project.id === action.project.id ? action.project : project;
			});
		case CHECKOUT_CART:
			return action.cart;
		default:
			return state;
	}
};
