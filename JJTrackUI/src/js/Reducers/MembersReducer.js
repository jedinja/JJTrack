import { LOAD_MEMBERS, ADD_MEMBER } from '../Actions/ActionNames';

const STATE = [];

export const members = (state = STATE, action) => {

	switch(action.type) {
		case LOAD_MEMBERS: {
			return action.data;
		}
		case ADD_MEMBER: {
			return [action.data].concat(state);
		}
	}
	return state;
};