import { BaseRestClient } from './BaseRestClient';

class statusClient extends BaseRestClient {
	constructor() {
		super('ok/');
	}

	get() {
		return super.get();
	}
}

export const StatusClient = new statusClient();