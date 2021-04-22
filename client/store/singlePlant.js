import Axios from 'axios';

// action type
const SET_SINGLE_PLANT = 'SET_SINGLE_PLANT';

// action creator
const setSinglePlant = (plant) => {
  return {
    type: SET_SINGLE_PLANT,
    plant,
  };
};

// thunk creator
export const fetchSinglePlant = (plantId) => {
  return async (dispatch) => {
    try {
      const { data: plant } = await Axios.get(`/api/plants/${plantId}`);
      dispatch(setSinglePlant(plant));
    } catch (error) {
      console.log(error);
    }
  };
};

// reducer
export default function reducer(state = {}, action) {
  switch (action.type) {
    case SET_SINGLE_PLANT:
      return action.plant;
    default:
      return state;
  }
}
