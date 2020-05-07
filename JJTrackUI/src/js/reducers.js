import { combineReducers } from 'redux';
import { createStore } from 'redux';
import { members } from './Reducers/MembersReducer';
//import DevTools from './Components/Dev/DevTools';

export const Store = createStore(
	combineReducers({
		members
	}),
	{},
	//DevTools.instrument()
);