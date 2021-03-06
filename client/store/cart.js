import axios from 'axios';
import { LOG_OUT } from './auth';
import history from '../history';
//Action types
const GET_CART = 'GET_CART';
const UPDATE_CART = 'UPDATE_CART';
const CHECKOUT_CART = 'CHECKOUT_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const ADD_ITEMS = 'ADD_ITEMS';

//Actions creators
const getCart = (cart) => ({
  type: GET_CART,
  cart,
});
const updateCart = (cart) => ({
  type: UPDATE_CART,
  cart,
});
const checkoutCart = (cart) => ({
  type: CHECKOUT_CART,
  cart,
});
const removeFromCart = (cart) => ({
  type: REMOVE_FROM_CART,
  cart,
});
const addItems = (cart) => ({
  type: ADD_ITEMS,
  cart,
});

//Thunk creators
export const fetchCart = (userId) => {
  return async (dispatch) => {
    try {
      const { data: userCart } = await axios.get(`api/cart/${userId}`);
      if (!userCart) {
        dispatch(getCart({}));
      } else {
        dispatch(getCart(userCart));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const getUpdateCart = (userId, plant, quantity) => {
  return async (dispatch) => {
    try {
      const { data: userCart } = await axios.put(
        `api/cart/${userId}/update?plant=${plant}&quantity=${quantity}`
      );
      dispatch(updateCart(userCart));
    } catch (error) {
      console.log(error);
    }
  };
};
export const getCheckoutCart = (userId) => {
  return async (dispatch) => {
    try {
      const { data: order } = await axios.post(`api/cart/${userId}/checkout`);
      dispatch(checkoutCart(order));
      history.push('/order-confirmation');
    } catch (error) {
      console.log(error);
    }
  };
};

export const getRemoveFromCart = (userId, plantId) => {
  return async (dispatch) => {
    try {
      const { data: userCart } = await axios.put(
        `api/cart/${userId}/remove?plantId=${plantId}`
      );
      dispatch(removeFromCart(userCart));
    } catch (error) {
      console.log(error);
    }
  };
};

export const addItemsToCart = (userId, items) => {
  return async (dispatch) => {
    try {
      const { data: cart } = await axios.put(
        `/api/users/${userId}/orders`,
        items
      );
      dispatch(addItems(cart));
    } catch (error) {
      console.log(error);
    }
  };
};

// Reducer
export default (state = {}, action) => {
  switch (action.type) {
    case LOG_OUT:
      return {};
    case GET_CART:
      return action.cart;
    case UPDATE_CART:
      return action.cart;
    case CHECKOUT_CART:
      return {};
    case REMOVE_FROM_CART:
      return action.cart;
    case ADD_ITEMS:
      return action.cart;
    default:
      return state;
  }
};
