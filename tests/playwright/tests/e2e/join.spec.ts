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
			await app.join.shouldHaveUsernameError('top button');
			await app.join.shouldHaveUsernameError('bottom button');

			await app.page.reload();
			await app.join.shouldNotHaveUsernameError('top button');
			await app.join.shouldNotHaveUsernameError('bottom button');

			await app.join.submitPredictions('bottom button');
			await app.join.shouldHaveUsernameError('top button');
			await app.join.shouldHaveUsernameError('bottom button');
		});

		test('Username taken', async ({ app }) => {
			// TODO
		});
	});
});
