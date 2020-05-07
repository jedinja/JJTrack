import { combineReducers } from 'redux';
import { createStore } from 'redux';
import { members } from './Reducers/MembersReducer';
import { competitions } from './Reducers/CompetitionsReducer';
//import DevTools from './Components/Dev/DevTools';

export const Store = createStore(
	combineReducers({
		members, competitions
	}),
	{},
	//DevTools.instrument()
);