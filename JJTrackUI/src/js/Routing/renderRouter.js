import React from 'react';
import { Router, Route } from 'react-router';
import { Provider } from 'react-redux';
import { history } from './History';
import { Routes } from './Routes';
import { Store } from '../reducers';

export default function renderRouter() {
	return (
			<Provider store={ Store }>
				<Router history={ history }>

				</Router>
			</Provider>
	);
}