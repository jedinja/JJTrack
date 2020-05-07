import { BaseRestClient } from './BaseRestClient';

class compClient extends BaseRestClient {
	constructor() {
		super('comp/');
	}

	get() {
		return super.get();
	}
}

export const CompetitionClient = new compClient();