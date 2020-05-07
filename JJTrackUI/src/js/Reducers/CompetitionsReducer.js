import {LOAD_COMPETITION, ADD_COMPETITIOIN} from '../Actions/ActionNames';

const STATE = [];

export const competitions = (state = STATE, action) => {

	switch(action.type) {
		case LOAD_COMPETITION: {
			return action.data;
		}
		case ADD_COMPETITIOIN: {
			return [action.data].concat(state);
		}
	}
	return state;
};