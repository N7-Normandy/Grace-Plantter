import axios from 'axios';

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
  return async (dispatch) => {
    try {
      const { data: orders } = await axios.get(
        `/api/users/${userId}/orders/filter?order=createdAt+ASC&status[not]=cart`
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
    case SET_ORDERS:
      return action.orders;
    default:
      return state;
  }
}
