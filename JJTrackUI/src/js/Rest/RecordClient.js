import { BaseRestClient } from './BaseRestClient';

class recordClient extends BaseRestClient {
	constructor() {
		super('points/');
	}

	get() {
		return super.get();
	}
}

export const RecordClient = new recordClient();