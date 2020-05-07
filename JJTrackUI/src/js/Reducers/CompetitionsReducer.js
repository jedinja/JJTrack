import {LOAD_COMPETITION, ADD_COMPETITIOIN, UPDATE_COMPETITIOIN} from '../Actions/ActionNames';
import {_id} from '../lib';

const STATE = [];

export const competitions = (state = STATE, action) => {

	switch(action.type) {
		case LOAD_COMPETITION: {
			return action.data;
		}
		case ADD_COMPETITIOIN: {
			return [action.data].concat(state);
		}
		case UPDATE_COMPETITIOIN: {
			return state.filter(f => _id(f) !== _id(action.data)).concat(action.data);
		}
	}
	return state;
};