// Page Object Modelの基底クラス
import { Page } from "@playwright/test";

export class BasePage {
    constructor(protected page: Page) {
        this.page = page;
    }

    // ページに移動
    async navigateTo(url: string) {
        await this.page.goto(url);
    }

    // ページタイトルを取得
    async getPageTitle() {
        return await this.page.title();
    }

    // ページURLを取得
    async getPageUrl() {
        return await this.page.url();
    }
}