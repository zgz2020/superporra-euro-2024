import { APIRequestContext } from '@playwright/test';
import { PrivateLeagues } from './privateLeagues';
import { User } from './user';

export class Api {
	readonly request: APIRequestContext;

	readonly privateLeagues: PrivateLeagues;

	readonly user: User;

	constructor(request: APIRequestContext) {
		this.privateLeagues = new PrivateLeagues(request);
		this.user = new User(request);
	}
}
