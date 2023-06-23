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
}
