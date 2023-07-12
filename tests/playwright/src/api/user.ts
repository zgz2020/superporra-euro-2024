import { APIRequestContext } from '@playwright/test';
import md5 from 'md5';

export class User {
	readonly request: APIRequestContext;

	constructor(request: APIRequestContext) {
		this.request = request;
	}

	async create({ email, password, role }: { email: string; password: string; role?: 'admin' }) {
		const pwd = password ? md5(password) : null;
		const data = role
			? {
					user: {
						id: email,
						password: pwd,
						role,
					},
			  }
			: {
					user: {
						id: email,
						password: pwd,
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
