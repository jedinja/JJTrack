import React from 'react';
import { Router, Route } from 'react-router';
import { Provider } from 'react-redux';
import { history } from './History';
import { Routes } from './Routes';
import { Store } from '../reducers';
import {MainPage} from '../Components/MainPage';

export default function renderRouter() {
	return (
			<Provider store={ Store }>
				<Router history={ history }>
					<Route path={ Routes.root.full() } component={ MainPage }> </Route>
				</Router>
			</Provider>
	);
}