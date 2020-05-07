import { LOAD_MEMBERS } from '../Actions/ActionNames';

const STATE = [];

export const members = (state = STATE, action) => {

	switch(action.type) {
		case LOAD_MEMBERS: {
			return action.data;
		}
	}
	return state;
};