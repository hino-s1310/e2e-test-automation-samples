// ログイン画面のページオブジェクト
// 純粋なPage Object Model - UI要素とアクションのみを担当

import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class LoginPage extends BasePage {
    private emailInput: Locator;
    private passwordInput: Locator;
    private loginButton: Locator;

    constructor(page: Page) {
        super(page);
        this.emailInput = page.locator("#email");
        this.passwordInput = page.locator("#password");
        this.loginButton = page.locator("#login-button");
    }

    // 基本的なアクションメソッド
    async inputEmail(email: string): Promise<void> {
        await this.emailInput.fill(email);
    }

    async inputPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    async clickLoginButton(): Promise<void> {
        await this.loginButton.click();
    }

    // 検証メソッド
    async isEmailVisible(): Promise<boolean> {
        return await this.emailInput.isVisible();
    }

    async isPasswordVisible(): Promise<boolean> {
        return await this.passwordInput.isVisible();
    }

    async isLoginButtonVisible(): Promise<boolean> {
        return await this.loginButton.isVisible();
    }


}