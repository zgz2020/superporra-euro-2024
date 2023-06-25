import { test } from '../../src/fixtures';

test.describe('Homepage', async () => {
	test('should redirect to "join" page', async ({ app }) => {
		await app.homepage.open();
		await app.homepage.signUp();
		await app.join.shouldBeLoaded({ language: 'english' });
	});
});
