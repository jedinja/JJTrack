import { combineReducers } from 'redux';
import { createStore } from 'redux';
//import DevTools from './Components/Dev/DevTools';

export const Store = createStore(
	combineReducers({

	}),
	{},
	//DevTools.instrument()
);