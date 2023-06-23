import { request, test as base } from '@playwright/test';
import { Api } from './api';
import { App } from './app';

type MyFixtures = {
	api: Api;
	app: App;
};

export const test = base.extend<MyFixtures>({
	api: async ({}, use) => {
		const apiContext = await request.newContext();
		const api = new Api(apiContext);

		await use(api);
	},
	app: async ({ page }, use) => {
		const app = new App(page);

		await use(app);

		await app.page.close();
	},
});
