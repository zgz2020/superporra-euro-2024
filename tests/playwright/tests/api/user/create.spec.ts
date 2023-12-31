import { test } from '../../../src/fixtures';
import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('API - user: Create', async () => {
	test('should create a user with valid email and password', async ({ api }) => {
		const randomEmail = `automated-${faker.internet.email()}`;

		const response = await api.user.create({ email: randomEmail, password: 'test1234' });

		expect(response.status()).toEqual(200);
		expect(await response.json()).toMatchObject({
			session: {
				authenticated: 'AUTHENTICATED',
				id: randomEmail,
				idToken: {
					token: expect.any(String),
					userID: randomEmail,
					_id: expect.any(String),
				},
			},
		});
	});

	test('should create a user with valid email, password and role', async ({ api }) => {
		const randomEmail = `automated-${faker.internet.email()}`;

		const response = await api.user.create({
			email: randomEmail,
			password: 'test1234',
			role: 'admin',
		});

		expect(response.status()).toEqual(200);
		expect(await response.json()).toMatchObject({
			session: {
				authenticated: 'AUTHENTICATED',
				id: randomEmail,
				idToken: {
					token: expect.any(String),
					userID: randomEmail,
					_id: expect.any(String),
				},
			},
		});
	});

	[
		'automated-invalidEmail',
		'automated-invalidEmail@',
		'automated-invalidEmail@invalid',
		'automated-invalidEmail@invalid.',
		'@automated-invalid.com',
		'automated-invalidEmailinvalid.com',
		'automated-invalidEmail@.com',
	].forEach((email) =>
		test(`should not create a user with invalid email - ${email}`, async ({ api }) => {
			const response = await api.user.create({
				email,
				password: 'test1234',
			});

			expect(response.status()).toEqual(404);
		})
	);

	test('should not create a user with no email', async ({ api }) => {
		const response = await api.user.create({
			email: '',
			password: 'test1234',
		});

		expect(response.status()).toEqual(404);
		expect(await response.json()).toMatchObject({
			error: {
				message: 'Email address is mandatory!',
			},
		});
	});

	test('should not create a user with no password', async ({ api }) => {
		const response = await api.user.create({
			email: 'automated-email@email.com',
			password: '',
		});

		expect(response.status()).toEqual(404);
		expect(await response.json()).toMatchObject({
			error: {
				message: 'Password is mandatory!',
			},
		});
	});
});
