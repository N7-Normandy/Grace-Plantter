import axios from 'axios';
const initialState = [];
//Action types
const GET_CART = 'GET_CART';
const UPDATE_CART = 'UPDATE_CART';
const CHECKOUT_CART = 'CHECKOUT_CART';

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

//Thunk creators
export const fetchCart = () => {
  return async (dispatch) => {
    const { data: cart } = await axios.get('/cart');
    dispatch(getCart(cart));
  };
};
export const getUpdateCart = (cart) => {
  return async (dispatch) => {
    const { data: userCart } = await axios.put('/cart', cart);
    dispatch(updateCart(userCart));
  };
};
export const getCheckoutCart = (cart) => {
  return async (dispatch) => {
    const { data: order } = await axios.post('/cart', cart);
    dispatch(checkoutCart(order));
  };
};

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    case UPDATE_CART:
      return action.cart;
    case CHECKOUT_CART:
      return action.cart;
    default:
      return state;
  }
};
