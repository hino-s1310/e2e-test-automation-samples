// マイページのページオブジェクト
// ログイン後のユーザー情報表示ページ

import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class MypagePage extends BasePage {
    private username: Locator;
    private email: Locator;

    constructor(page: Page) {
        super(page);
        this.username = page.locator("#username");
        this.email = page.locator("#email");
    }

    // ユーザー名を取得
    async getUsername(): Promise<string> {
        return await this.username.textContent() || '';
    }

    // メールアドレスを取得
    async getEmail(): Promise<string> {
        return await this.email.textContent() || '';
    }

    // ユーザー名が表示されているか確認
    async isUsernameVisible(): Promise<boolean> {
        return await this.username.isVisible();
    }

    // メールアドレスが表示されているか確認
    async isEmailVisible(): Promise<boolean> {
        return await this.email.isVisible();
    }

    // ページが完全に読み込まれるまで待機
    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded');
    }
}