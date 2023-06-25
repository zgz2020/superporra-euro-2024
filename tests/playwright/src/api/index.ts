import { APIRequestContext } from '@playwright/test';
import { Predictions } from './predictions';
import { PrivateLeagues } from './privateLeagues';
import { User } from './user';

export class Api {
	readonly request: APIRequestContext;

	readonly predictions: Predictions;

	readonly privateLeagues: PrivateLeagues;

	readonly user: User;

	constructor(request: APIRequestContext) {
		this.predictions = new Predictions(request);
		this.privateLeagues = new PrivateLeagues(request);
		this.user = new User(request);
	}
}
