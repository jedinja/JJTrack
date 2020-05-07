import { LOAD_RECORD, ADD_RECORD } from '../Actions/ActionNames';
import {_recProp, group} from '../lib';

const STATE = {};

const group_criteria = [
	_recProp('CompetitionId'),
	_recProp('MemberId'),
];

export const records = (state = STATE, action) => {

	switch(action.type) {
		case LOAD_RECORD: {
			return group(action.data, group_criteria);
		}
		case ADD_RECORD: {
			return group([action.data], group_criteria, state);
		}
	}
	return state;
};