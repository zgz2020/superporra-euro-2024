import { faker } from '@faker-js/faker';
import { test } from '../../src/fixtures';

test.describe('Join - Signed Out status', async () => {
	test('should redirect to Join page', async ({ app }) => {
		await app.join.open();
		await app.join.shouldHaveMatchScoresEmpty();
		await app.join.shouldHaveGeneralPredictionsEmpty();
	});

	test.describe('Negative paths', async () => {
		test('No username', async ({ app }) => {
			await app.join.open();
			await app.join.submitPredictions('top button');
			await app.join.shouldHaveNoUsernameError('top button');
			await app.join.shouldHaveNoUsernameError('bottom button');

			await app.page.reload();
			await app.join.shouldNotHaveNoUsernameError('top button');
			await app.join.shouldNotHaveNoUsernameError('bottom button');

			await app.join.submitPredictions('bottom button');
			await app.join.shouldHaveNoUsernameError('top button');
			await app.join.shouldHaveNoUsernameError('bottom button');
		});

		test.describe('', async () => {
			const randomUsername = `Test Participant - ${faker.internet.userName()}`;

			test.beforeEach(async ({ api }) => {
				await api.predictions.create({ username: randomUsername });
			});

			test.afterEach(async ({ api }) => {
				await api.predictions.removeTestPredictions();
			});

			test('Username taken', async ({ app }) => {
				await app.join.open();
				await app.join.shouldNotHaveUsernameTakenError();

				await app.join.fillUsername(randomUsername);
				await app.join.shouldHaveUsernameTakenError();
				await app.join.shouldHaveSubmitButtonsDisabled();
			});
		});

		test('No email', async ({ app }) => {
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
			test(`Invalid email - ${email}`, async ({ app }) => {
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

			test.afterEach(async ({ api }) => {
				await api.user.removeTestUsers();
			});

			test('Already registered email', async ({ app }) => {
				await app.join.open();
				await app.join.fillUsername('any username');
				await app.join.fillEmail(randomEmail);

				await app.join.submitPredictions('top button');
				await app.join.shouldHaveEmailTakenError('top');
				await app.join.shouldHaveEmailTakenError('bottom');

				await app.page.reload();
				await app.join.shouldNotHaveEmailTakenError('top');
				await app.join.shouldNotHaveEmailTakenError('bottom');

				await app.join.fillUsername('any username');
				await app.join.fillEmail(randomEmail);

				await app.join.submitPredictions('bottom button');
				await app.join.shouldHaveEmailTakenError('top');
				await app.join.shouldHaveEmailTakenError('bottom');
			});
		});
	});
});
