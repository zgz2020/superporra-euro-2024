import { APIRequestContext } from '@playwright/test';

export class Tokens {
	readonly request: APIRequestContext;

	constructor(request: APIRequestContext) {
		this.request = request;
	}

	async removeTestTokens() {
		return await this.request.post('/remove-test-tokens');
	}
}
