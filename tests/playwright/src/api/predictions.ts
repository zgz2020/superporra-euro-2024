import { APIRequestContext } from '@playwright/test';
import { type Prediction, randomPrediction } from './utils';

export class Predictions {
	readonly request: APIRequestContext;

	constructor(request: APIRequestContext) {
		this.request = request;
	}

	async create(prediction: Prediction) {
		const defaultPrediction = randomPrediction;

		return await this.request.post('/prediction/new', {
			data: {
				prediction: { ...defaultPrediction, ...prediction },
			},
		});
	}

	async removeTestPredictions() {
		return await this.request.post('/remove-test-predictions');
	}
}
