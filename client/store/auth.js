import axios from 'axios';
import history from '../history';
import {fetchCart} from '../store/cart';

const TOKEN = 'token';

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH';
export const LOG_OUT = 'LOG_OUT';

/**
 * ACTION CREATORS
 */
const setAuth = auth => ({type: SET_AUTH, auth});

/**
 * THUNK CREATORS
 */
// export const me = () => async dispatch => {
// 	const token = window.localStorage.getItem(TOKEN);
// 	if (token) {
// 		const res = await axios.get('/auth/me', {
// 			headers: {
// 				authorization: token,
// 			},
// 		});
// 		return dispatch(setAuth(res.data));
// 	}
// };
export const me = () => {
	return async dispatch => {
		try {
			const token = window.localStorage.getItem(TOKEN);
			if (token) {
				const res = await axios.get('/auth/me', {
					headers: {
						authorization: token,
					},
				});
				dispatch(setAuth(res.data));
				dispatch(fetchCart(res.data.id));
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const authenticate = (
	email,
	password,
	method,
	name
) => async dispatch => {
	try {
		let res;
		if (name) {
			res = await axios.post(`/auth/${method}`, {email, password, name});
		} else {
			res = await axios.post(`/auth/${method}`, {email, password});
		}

		window.localStorage.setItem(TOKEN, res.data.token);
		dispatch(me());
	} catch (authError) {
		return dispatch(setAuth({error: authError}));
	}
};

export const logout = () => {
	window.localStorage.removeItem(TOKEN);
	history.push('/login');
	return {
		type: LOG_OUT,
		auth: {},
	};
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
	switch (action.type) {
		case LOG_OUT:
			return action.auth;
		case SET_AUTH:
			return action.auth;
		default:
			return state;
	}
}
