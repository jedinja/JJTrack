function genQuery(queryObj) {
	let keys = Object.keys(queryObj).filter(key => queryObj[key] !== null && queryObj[key] !== undefined);

	return keys.length ? ('?' + keys.map(k => `${k}=${queryObj[k]}`).join('&')) : '';
}

let paths =  window.location.origin.split(':');
paths[2] = '3000';

const BASE = paths.join(':') + '/';

export const METHOD = {
	GET: 'GET',
	POST: 'POST',
	DELETE: 'DELETE',
	PUT: 'PUT',
	PATCH: 'PATCH',
};

class BaseRestClient {
	constructor(url) {
		this._url = url;
	}

	static _applyCommonHeaders(xhr, formData) {
		xhr.setRequestHeader('Accept', 'application/json');
		if (!formData)
			xhr.setRequestHeader('Content-Type', formData ? 'multipart/form-data' : 'application/json');
	}

	static _execXhr = (url, method, data, additionalConfig = ()=>{}) => {

		console.log(url, method, data);

		return new Promise((resolve, reject) => {

			let xhr = new XMLHttpRequest();

			xhr.open(method, url);
			xhr.withCredentials = true;
			BaseRestClient._applyCommonHeaders(xhr, data instanceof FormData);

			xhr.onload = () => {
				if (xhr.status >= 200 && (xhr.status < 300 || xhr.status === 304)) {
					resolve(xhr.response && JSON.parse(xhr.response));
				} else {
					reject({ text: xhr.statusText, status: xhr.status});
				}
			};
			xhr.onerror = () => reject({ text: xhr.statusText, status: xhr.status});
			additionalConfig(xhr);
			data ? xhr.send(data instanceof FormData ? data : JSON.stringify(data)) : xhr.send();
		});
	};

	_getPostUrl() {
		return `${BASE}${this._url}`;
	}

	_getGetUrl(id, query) {
		return `${BASE}${this._url}${id}${genQuery(query)}`;
	}

	get(id = '', query = {}) {
		return BaseRestClient._execXhr(this._getGetUrl(id, query), METHOD.GET);
	}

	post(data) {
		return BaseRestClient._execXhr(this._getPostUrl(), METHOD.POST, data);
	}

	put(data, id = '') {
		return BaseRestClient._execXhr(`${BASE}${this._url}${id}`, METHOD.PUT, data);
	}

	patch(data, id = '') {
		return BaseRestClient._execXhr(`${BASE}${this._url}${id}`, METHOD.PATCH, data);
	}

	delete(id = '', data) {
		return BaseRestClient._execXhr(`${BASE}${this._url}${id}`, METHOD.DELETE, data);
	}
}

class DownloadClient {
	constructor(url) {
		this._url = url;
	}

	static _execXhr = (url, method, data) => {

		return new Promise((resolve, reject) => {

			let xhr = new XMLHttpRequest();

			xhr.open(method, url);
			xhr.withCredentials = true;

			xhr.onload = () => {
				if (xhr.status >= 200 && (xhr.status < 300 || xhr.status === 304)) {
					resolve(xhr.response);
				} else {
					reject({ text: xhr.statusText, status: xhr.status});
				}
			};
			xhr.onerror = () => reject({ text: xhr.statusText, status: xhr.status});
			data ? xhr.send(data instanceof FormData ? data : JSON.stringify(data)) : xhr.send();
		});
	};

	download(id = '', query = {}) {
		return DownloadClient._execXhr(`${BASE}${this._url}${id}${genQuery(query)}`, METHOD.GET);
	}
}

export { BaseRestClient, DownloadClient };