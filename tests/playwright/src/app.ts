import { Page } from '@playwright/test';
import { Homepage, Join } from './pages';

export class App {
	readonly page: Page;

	readonly homepage: Homepage;

	readonly join: Join;

	constructor(page: Page) {
		this.page = page;
		this.homepage = new Homepage(page);
		this.join = new Join(page);
	}
}
