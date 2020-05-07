import {LOAD_MEMBERS, ADD_MEMBER, UPDATE_MEMBER} from '../Actions/ActionNames';
import {_id} from '../lib';

const STATE = [];

export const members = (state = STATE, action) => {

	switch(action.type) {
		case LOAD_MEMBERS: {
			return action.data;
		}
		case ADD_MEMBER: {
			return [action.data].concat(state);
		}
		case UPDATE_MEMBER: {
			return state.filter(f => _id(f) !== _id(action.data)).concat(action.data);
		}
	}
	return state;
};