import Axios from 'axios';

// ACTION TYPE
const ADD_ITEMS = 'ADD_ITEMS';

// ACTION CREATOR
const addItems = () => {
  return {
    type: ADD_TO_CART,
  };
};

// THUNK CREATOR
export const addItemsToCart = (userId, items) => {
  return async (dispatch) => {
    try {
      await Axios.put(`/api/users/${userId}/orders`, items);
    } catch (error) {
      console.log(error);
    }
  };
};

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    default:
      return state;
  }
}
