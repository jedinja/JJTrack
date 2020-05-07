import { BaseRestClient } from './BaseRestClient';

class memberClient extends BaseRestClient {
	constructor() {
		super('members/');
	}

	get() {
		return super.get();
	}
}

export const MemberClient = new memberClient();