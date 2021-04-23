import axios from 'axios';

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
  return async (dispatch) => {
    try {
      const { data: orderArr } = await axios.get(
        `/api/users/${userId}/orders/filter?limit=1&order=createdAt+ASC&status[not]=cart`
      );

      dispatch(setRecent(orderArr[0]));
    } catch (error) {
      console.error(error);
    }
  };
}

export default function (state = {}, action) {
  switch (action.type) {
    case SET_RECENT:
      return action.order;
    default:
      return state;
  }
}
