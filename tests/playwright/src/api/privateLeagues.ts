import { APIRequestContext } from '@playwright/test';

export class PrivateLeagues {
	readonly request: APIRequestContext;

	constructor(request: APIRequestContext) {
		this.request = request;
	}

	async create({ name }: { name: string }) {
		return await this.request.post('/private-league/create', {
			data: { leagueName: name },
		});
	}
}
