// ACTION TYPE
const ADD_TO_CART = 'ADD_TO_CART';

// ACTION CREATOR
const addToCart = () => {
  return {
    type: ADD_TO_CART,
  };
};

// THUNK CREATOR
export const fetchItems = () => {
  return async (dispatch) => {
    try {
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
