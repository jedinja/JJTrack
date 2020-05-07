const Routes = {
	root: ['/'],
};

function fullRoute (params = {}) {
	return this.map(seg => (seg[0] === ':' && params[seg.substring(1)]) ? params[seg.substring(1)] : seg).join('/');
}
for (let key of Object.keys(Routes)) {
	Routes[key].full = fullRoute.bind(Routes[key]);
}

export { Routes };