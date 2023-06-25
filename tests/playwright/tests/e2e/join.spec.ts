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
			test.beforeEach(async ({ api }) => {
				await api.predictions.create({ username: 'Test Participant username' });
			});

			test.afterEach(async ({ api }) => {
				await api.predictions.removeTestPredictions();
			});

			test('Username taken', async ({ app }) => {
				await app.join.open();
				await app.join.shouldNotHaveUsernameTakenError();

				await app.join.fillUsername('Test Participant username');
				await app.join.shouldHaveUsernameTakenError();
				await app.join.shouldHaveSubmitButtonsDisabled();
			});
		});
	});
});
