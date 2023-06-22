import { expect } from '@playwright/test';
import { test } from '../../src/fixtures';

test.describe('Homepage', async () => {
	test.only('Link to sign up', async ({ app, page }) => {
		await app.homepage.open();
		await app.homepage.signUp();
		await app.join.shouldBeLoaded({ language: 'english' });
	});
});
