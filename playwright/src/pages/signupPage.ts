// 新規登録ページのページオブジェクト

import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class SignupPage extends BasePage {
    private username: Locator;
    private email: Locator;
    private password: Locator;
    private confirmPassword: Locator;
    private signupButton: Locator;

    constructor(page: Page) {
        super(page);
        this.username = page.getByRole("textbox", { name: "氏名 必須" });
        this.email = page.getByRole("textbox", { name: "メールアドレス 必須" });
        this.password = page.getByRole("textbox", { name: "パスワード 必須" });
        this.confirmPassword = page.getByRole("textbox", { name: "パスワード（確認） 必須" });
        this.signupButton = page.getByRole("button", { name: "登録" });
    }

    // ユーザー名を入力
    async inputUsername(username: string): Promise<void> {
        await this.username.fill(username);
    }
    
    // メールアドレスを入力
    async inputEmail(email: string): Promise<void> {
        await this.email.fill(email);
    }

    // パスワードを入力
    async inputPassword(password: string): Promise<void> {
        await this.password.fill(password);
    }

    // パスワード確認を入力
    async inputConfirmPassword(confirmPassword: string): Promise<void> {
        await this.confirmPassword.fill(confirmPassword);
    }

    // 登録ボタンをクリック
    async clickSignupButton(): Promise<void> {
        await this.signupButton.click();
    }
    
}