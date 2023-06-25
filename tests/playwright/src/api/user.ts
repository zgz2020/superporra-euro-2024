import { APIRequestContext } from '@playwright/test';
import md5 from 'md5';

export class User {
	readonly request: APIRequestContext;

	constructor(request: APIRequestContext) {
		this.request = request;
	}

	async create(user: { email: string; password: string; role?: 'admin' }) {
		return await this.request.post('/user/new', {
			data: { user: { ...user, id: user.email, password: md5(user.password) } },
		});
	}

	async removeTestUsers() {
		return await this.request.post('/remove-test-users');
	}
}
