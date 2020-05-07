import { combineReducers } from 'redux';
import { createStore } from 'redux';
import { members } from './Reducers/MembersReducer';
import { competitions } from './Reducers/CompetitionsReducer';
import {records} from './Reducers/RecordReducer';
//import DevTools from './Components/Dev/DevTools';

export const Store = createStore(
	combineReducers({
		members, competitions, records
	}),
	{},
	//DevTools.instrument()
);