import { browserHistory } from 'react-router';
import {Routes} from './Routes';

export const history = {
	...browserHistory,
	route: (r, par) => {
		return browserHistory.push(
			r.full(par)
		)
	},
};