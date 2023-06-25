import { APIRequestContext } from '@playwright/test';
import md5 from 'md5';

export class User {
	readonly request: APIRequestContext;

	constructor(request: APIRequestContext) {
		this.request = request;
	}

	async create({ email, password, role }: { email: string; password: string; role?: 'admin' }) {
		const data = role
			? {
					user: {
						id: email,
						password: md5(password),
						role: role ?? null,
					},
			  }
			: {
					user: {
						id: email,
						password: md5(password),
					},
			  };

		return await this.request.post('/user/new', {
			data,
		});
	}

	async removeTestUsers() {
		return await this.request.post('/remove-test-users');
	}
}
