import axios from 'axios';

// ACTION TYPES
const GET_PLANTS = 'GET_PLANTS';

// ACTION CREATORS
const getPlants = plants => ({
  type: GET_PLANTS,
  plants,
});

// THUNK MIDDLEWARE
export const fetchPlants = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get ('/api/plants');
      dispatch (getPlants (data));
    } catch (error) {
      console.log ('Failed to get plants', error);
    }
  };
};

// REDUCER
const initialState = [];
const plantsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PLANTS:
      return action.plants;
    default:
      return state;
  }
};

export default plantsReducer;
