import { test } from '../../src/fixtures';

test.describe('Join - Signed Out status', async () => {
	test('should redirect to Join page', async ({ app }) => {
		await app.join.open();
		await app.join.shouldHaveMatchScoresEmpty();
		await app.join.shouldHaveGeneralPredictionsEmpty();
	});
});
