import axios from 'axios';
import history from '../history';

// ACTION TYPES
const GOT_FILTERED_PLANTS = 'GOT_FILTERED_PLANTS';

// ACTION CREATORS
const gotPlants = (plants) => ({
  type: GOT_FILTERED_PLANTS,
  plants,
});

// THUNK CREATORS
export const filterPlants = (query) => {
  return async (dispatch) => {
    try {
      const { data: plants } = await axios.get(
        `/api/plants/search?like=${query}`
      );
      dispatch(gotPlants(plants));
      history.push('/searchResults');
    } catch (error) {
      console.error(error);
    }
  };
};

// REDUCER
const initialState = [];
const searchResultsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_FILTERED_PLANTS:
      return action.plants;
    default:
      return state;
  }
};

export default searchResultsReducer;
