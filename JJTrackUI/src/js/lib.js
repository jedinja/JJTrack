export const ASC = 1;
export const DESC = -1;
export const plainSort = (key, order = ASC) => ((a, b) => (a[key] > b[key] ? order : (a[key] < b[key] ? -order : 0)));
export const sortByString = (key, order = ASC, falsySub = '') => ((a, b) => {
	let A = ((key ? a[key] : a) || falsySub).toUpperCase();
	let B = ((key ? b[key] : b) || falsySub).toUpperCase();

	return (A > B ? order : (A < B ? -order : 0));
});
export const sortByPropOfField = (key, prop, order = ASC) => ((a, b) => a[key][prop] - b[key][prop]);
export const chainSorting = sorts => ((a, b) => {
	for (let sort of sorts) {
		let res = sort(a,b);
		if (res !== 0) {
			return res;
		}
	}
	return 0;
});

export const recSort = (key, order = ASC) => (a, b) => plainSort(key, order)(_rec(a), _rec(b));
export const recStringSort = (key, order = ASC) => (a, b) => sortByString(key, order)(_rec(a), _rec(b));

export const _id = obj => obj.Id;
export const _rec = obj => obj.Record;
export const _prop = name => a => a[name];

export const VV = (f, g) => (...params) => g(f(...params));

export const _recProp = name => VV( _rec, _prop(name));

export function emptyGrid () {
	return {
		mods: [],
		data: [],
		columnKeys: [],
		headers: [],
		footers: [],
	};
}

export function gridRow (id, array) {
	array.rowId = id;
	return array;
}