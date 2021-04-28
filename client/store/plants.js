import axios from 'axios';
import history from '../history';

// ACTION TYPES
const GET_PLANTS = 'GET_PLANTS';
const GET_ALL_PLANTS = 'GET_ALL_PLANTS';
const UPDATE_ALL_PLANTS = 'UPDATE_ALL_PLANTS';
const CREATE_PLANT = 'CREATE_PLANT';

// ACTION CREATORS
const getPlants = plants => ({
	type: GET_PLANTS,
	plants,
});
const getAllPlants = plants => ({
	type: GET_ALL_PLANTS,
	plants,
});
const updateAllPlants = plants => ({
	type: UPDATE_ALL_PLANTS,
	plants,
});
const createAPlant = plant => ({
	type: CREATE_PLANT,
	plant,

});

// THUNK MIDDLEWARE
export const fetchPlants = () => {
	return async dispatch => {
		try {
			const {data} = await axios.get('/api/plants');
			dispatch(getPlants(data));
		} catch (error) {
			console.log('Failed to get plants', error);
		}
	};
};
export const fetchAllPlants = () => {
	return async dispatch => {
		try {
			const {data: allPlants} = await axios.get('/api/plants/all');
			dispatch(getAllPlants(allPlants));
		} catch (error) {
			console.log('Failed to get plants', error);
		}
	};
};
export const getUpdatedPlants = plants => {
	return async dispatch => {
		try {
			const {data: allPlants} = await axios.post(`/api/plants/update`, plants);
			dispatch(updateAllPlants(allPlants));
		} catch (error) {
			console.log('Failed to get plants', error);
		}
	};
};
export const createPlant = plant => {
	return async dispatch => {
		try {
			const {data: newPlant} = await axios.post(`/api/plants/`, plant);
			dispatch(createAPlant(newPlant));
		} catch (error) {
			console.log('Failed to get plants', error);
		}
	};
};
// REDUCER
const initialState = [];
const plantsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_PLANTS:
			return action.plants;
		case GET_ALL_PLANTS:
			return action.plants;
		case UPDATE_ALL_PLANTS:
			return action.plants;
		default:
			return state;
	}
};

export default plantsReducer;
