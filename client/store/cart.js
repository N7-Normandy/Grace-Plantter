import axios from 'axios';
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
export const fetchCart = () => {
  return async dispatch => {
		const {data: userCart} = await axios.get ('/api/cart');
		console.log("inside fetchCart", userCart);
    dispatch (getCart (userCart));
  };
};
export const getUpdateCart = cart => {
  return async dispatch => {
    const {data: userCart} = await axios.put ('/api/cart', cart);
    dispatch (updateCart (userCart));
  };
};
export const getCheckoutCart = cart => {
  return async dispatch => {
    const {data: order} = await axios.post ('/api/cart', cart);
    dispatch (checkoutCart (order));
  };
};

export const getRemoveFromCart = id => async dispatch => {
  try {
    console.log ('inside getRemoveFromCart in redux', id);
		const userCart = await axios.put('/api/cart/remove', {id});
		console.log("DATA-->",userCart.data);
    dispatch (removeFromCart (userCart.data));
  } catch (error) {
    console.log (error);
  }
};

// Reducer
export default (state = [], action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    case UPDATE_CART:
      return state.map (cart => {
        console.log (cart);
        return cart.id === action.cart.id ? action.cart : cart;
      });
    case CHECKOUT_CART:
      return action.cart;
    case REMOVE_FROM_CART:
      console.log ('inside REMOVE_FROM_CART reducer', action.cart);
      return action.cart;
    default:
      return state;
  }
};
