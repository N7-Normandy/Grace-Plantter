import axios from 'axios';
import {LOG_OUT} from './auth';

// Action Types
const SET_ORDERS = 'SET_ORDERS';

// Action Creators
function setOrders(orders) {
	return {
		type: SET_ORDERS,
		orders,
	};
}

// Thunk Creators
export function fetchUserOrders(userId) {
	return async dispatch => {
		try {
			const {data: orders} = await axios.get(
				`/api/users/${userId}/orders/filter?order=createdAt+DESC&status[not]=cart`
			);

			dispatch(setOrders(orders));
		} catch (error) {
			console.error(error);
		}
	};
}

// Reducer
export default function (state = [], action) {
	switch (action.type) {
		case LOG_OUT:
			return [];
		case SET_ORDERS:
			return action.orders;
		default:
			return state;
	}
}
