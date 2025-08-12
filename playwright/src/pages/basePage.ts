// Page Object Modelの基底クラス
import { Page } from "@playwright/test";
import { Header } from "../components/header";

export class BasePage {
    public header: Header;

    constructor(protected page: Page) {
        this.page = page;
        this.header = new Header(page);
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

    // ページが完全に読み込まれるまで待機
    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded');
    }

    // ページインスタンスを更新
    updatePage(newPage: Page): void {
        (this as any).page = newPage;
        this.header.updatePage(newPage);
    }

    // ページインスタンスを取得
    getPage(): Page {
        return this.page;
    }
}