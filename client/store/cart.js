import axios from 'axios';
import {LOG_OUT} from './auth';
//Action types
const GET_CART = 'GET_CART';
const UPDATE_CART = 'UPDATE_CART';
const CHECKOUT_CART = 'CHECKOUT_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

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
const removeFromCart = cart => ({
	type: REMOVE_FROM_CART,
	cart,
});

//Thunk creators
export const fetchCart = userId => {
	return async dispatch => {
		try {
			const {data: userCart} = await axios.get(`api/cart/${userId}`);
			dispatch(getCart(userCart));
		} catch (error) {
			console.log(error);
		}
	};
};
export const getUpdateCart = (userId, plant) => {
	return async dispatch => {
		try {
			const {data: userCart} = await axios.put(`api/cart/${userId}`, plant);
			dispatch(updateCart(userCart));
		} catch (error) {
			console.log(error);
		}
	};
};
export const getCheckoutCart = (userId, cart) => {
	return async dispatch => {
		try {
			const {data: order} = await axios.post(`api/cart/${userId}`, cart);
			dispatch(checkoutCart(order));
		} catch (error) {
			console.log(error);
		}
	};
};

export const getRemoveFromCart = (userId, plantId) => {
	return async dispatch => {
		try {
			const {data: userCart} = await axios.put(
				`api/cart/${userId}/remove`,
				plantId
			);
			dispatch(removeFromCart(userCart));
		} catch (error) {
			console.log(error);
		}
	};
};

export const addItemsToCart = (userId, items) => {
	return async dispatch => {
		try {
			await axios.put(`/api/users/${userId}/orders`, items);
		} catch (error) {
			console.log(error);
		}
	};
};

// Reducer
export default (state = [], action) => {
	switch (action.type) {
		case LOG_OUT:
			return [];
		case GET_CART:
			return action.cart;
		case UPDATE_CART:
			return action.cart;
		case CHECKOUT_CART:
			return action.cart;
		case REMOVE_FROM_CART:
			return action.cart;
		default:
			return state;
	}
};
