import axios from 'axios';
import {LOG_OUT} from './auth';

// Action Types
const SET_RECENT = 'SET_RECENT';

// Action Creators
function setRecent(order) {
	return {
		type: SET_RECENT,
		order,
	};
}

// Thunk Creators
export function fetchRecentOrder(userId) {
	return async dispatch => {
		try {
			const {data: orderArr} = await axios.get(
				`/api/users/${userId}/orders/filter?limit=1&order=createdAt+DESC&status[not]=cart`
			);

			if (orderArr[0]) {
				dispatch(setRecent(orderArr[0]));
			}
		} catch (error) {
			console.error(error);
		}
	};
}

export default function (state = {}, action) {
	switch (action.type) {
		case SET_RECENT:
			return action.order;
		case LOG_OUT:
			return {};
		default:
			return state;
	}
}
