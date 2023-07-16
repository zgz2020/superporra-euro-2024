import { faker } from '@faker-js/faker';
import { test } from '../../src/fixtures';
import { expect } from '@playwright/test';

test.describe('Join - Signed Out status', async () => {
	test('should have form empty', async ({ app }) => {
		await app.join.open();
		await app.join.shouldHaveMatchScoresEmpty();
		await app.join.shouldHaveGeneralPredictionsEmpty();
	});

	test.describe('Negative paths', async () => {
		test('should display "No username" error', async ({ app }) => {
			await app.join.open();
			await app.join.submitPredictions('top button');
			await app.join.shouldHaveNoUsernameError('top');
			await app.join.shouldHaveNoUsernameError('bottom');

			await app.page.reload();
			await app.join.shouldNotHaveNoUsernameError('top');
			await app.join.shouldNotHaveNoUsernameError('bottom');

			await app.join.submitPredictions('bottom button');
			await app.join.shouldHaveNoUsernameError('top');
			await app.join.shouldHaveNoUsernameError('bottom');
		});

		test.describe('', async () => {
			const randomUsername = `Test Participant - ${faker.internet.userName()}`;

			test.beforeEach(async ({ api }) => {
				await api.predictions.create({ username: randomUsername });
			});

			test('should display "Username taken" error', async ({ app }) => {
				await app.join.open();
				await app.join.shouldNotHaveUsernameTakenError();

				await expect(async () => {
					await app.join.clearUsernameField();
					await app.join.fillUsername(randomUsername);
					await app.join.shouldHaveUsernameTakenError();
					await app.join.shouldHaveSubmitButtonsDisabled();
				}).toPass();
			});
		});

		test('should display "Invalid email" error when no email is entered', async ({ app }) => {
			await app.join.open();
			await app.join.fillUsername('any username');

			await app.join.submitPredictions('top button');
			await app.join.shouldHaveInvalidEmailError('top');
			await app.join.shouldHaveInvalidEmailError('bottom');

			await app.page.reload();
			await app.join.shouldNotHaveInvalidEmailError('top');
			await app.join.shouldNotHaveInvalidEmailError('bottom');

			await app.join.fillUsername('any username');

			await app.join.submitPredictions('bottom button');
			await app.join.shouldHaveInvalidEmailError('top');
			await app.join.shouldHaveInvalidEmailError('bottom');
		});

		['invalid', 'invalid@email', 'invalid@email.'].forEach((email) => {
			test(`Should display "Invalid email" error - ${email}`, async ({ app }) => {
				await app.join.open();
				await app.join.fillUsername('any username');
				await app.join.fillEmail(email);

				await app.join.submitPredictions('top button');
				await app.join.shouldHaveInvalidEmailError('top');
				await app.join.shouldHaveInvalidEmailError('bottom');

				await app.page.reload();
				await app.join.shouldNotHaveInvalidEmailError('top');
				await app.join.shouldNotHaveInvalidEmailError('bottom');

				await app.join.fillUsername('any username');
				await app.join.fillEmail(email);

				await app.join.submitPredictions('bottom button');
				await app.join.shouldHaveInvalidEmailError('top');
				await app.join.shouldHaveInvalidEmailError('bottom');
			});
		});

		test.describe('', async () => {
			const randomEmail = `automated-${faker.internet.email()}`;

			test.beforeEach(async ({ api }) => {
				await api.user.create({ email: randomEmail, password: 'test1234' });
			});

			test('should display "Already registered email" error', async ({ app }) => {
				await app.join.open();
				await app.join.fillUsername('any username');
				await app.join.fillEmail(randomEmail);

				await expect(async () => {
					await app.join.submitPredictions('bottom button');
					await app.join.shouldHaveEmailTakenError('top');
					await app.join.shouldHaveEmailTakenError('bottom');
				}).toPass();

				await app.page.reload();
				await app.join.shouldNotHaveEmailTakenError('top');
				await app.join.shouldNotHaveEmailTakenError('bottom');

				await app.join.fillUsername('any username');
				await app.join.fillEmail(randomEmail);

				await expect(async () => {
					await app.join.submitPredictions('bottom button');
					await app.join.shouldHaveEmailTakenError('top');
					await app.join.shouldHaveEmailTakenError('bottom');
				}).toPass();
			});
		});

		test('should display "You must enter a password" error when no password is entered', async ({
			app,
		}) => {
			await app.join.open();
			await app.join.fillUsername('any username');
			await app.join.fillEmail('automated-any@email.com');

			await app.join.submitPredictions('top button');
			await app.join.shouldHaveNoPasswordError('top');
			await app.join.shouldHaveNoPasswordError('bottom');

			await app.page.reload();
			await app.join.shouldNotHaveNoPasswordError('top');
			await app.join.shouldNotHaveNoPasswordError('bottom');

			await app.join.fillUsername('any username');
			await app.join.fillEmail('automated-any@email.com');

			await app.join.submitPredictions('bottom button');
			await app.join.shouldHaveNoPasswordError('top');
			await app.join.shouldHaveNoPasswordError('bottom');
		});
	});
});
