import { Page } from '@playwright/test';

export class Homepage {
	readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	async open() {
		await this.page.goto('/');
	}

	async signUp() {
		await this.page.getByTestId('sign-up-link').click();
	}
}
