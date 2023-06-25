import { expect, Page } from '@playwright/test';

export class Join {
	readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	async open() {
		await this.page.goto('/join');
	}

	async shouldBeLoaded({ language }: { language: 'english' | 'spanish' }) {
		if (language === 'english') {
			await expect(
				this.page.getByText('Join the Superporra by submitting your predictions')
			).toBeVisible();
		} else {
			await expect(
				this.page.getByText('Participa en la superporra mandando tus predicciones')
			).toBeVisible();
		}
	}

	async shouldHaveMatchScoresEmpty() {
		for (const score of await this.page.locator('form select').all()) {
			expect(await score.inputValue()).toEqual(' ');
		}
	}

	async shouldHaveGeneralPredictionsEmpty() {
		for (const generalPrediction of await this.page.getByTestId('general-prediction').all()) {
			const innerText = await generalPrediction.innerText();
			expect(innerText).toContain('???');
		}
	}

	async fillUsername(username: string) {
		await this.page.getByTestId('username-input').fill(username);
	}

	async submitPredictions(button: 'top button' | 'bottom button') {
		await this.page
			.getByTestId('submit-button')
			.nth(button === 'top button' ? 0 : 1)
			.click();
	}

	async shouldHaveNoUsernameError(button: 'top button' | 'bottom button') {
		await expect(
			this.page.getByTestId('no-username').nth(button === 'top button' ? 0 : 1)
		).toBeVisible();
	}

	async shouldNotHaveNoUsernameError(button: 'top button' | 'bottom button') {
		await expect(
			this.page.getByTestId('no-username').nth(button === 'top button' ? 0 : 1)
		).not.toBeVisible();
	}

	async shouldHaveUsernameTakenError() {
		await expect(this.page.getByTestId('username-taken')).toBeVisible();
	}

	async shouldNotHaveUsernameTakenError() {
		await expect(this.page.getByTestId('username-taken')).not.toBeVisible();
	}

	async shouldHaveSubmitButtonsDisabled() {
		expect(this.page.getByTestId('submit-button').nth(0)).toBeDisabled();
		expect(this.page.getByTestId('submit-button').nth(1)).toBeDisabled();
	}
}
