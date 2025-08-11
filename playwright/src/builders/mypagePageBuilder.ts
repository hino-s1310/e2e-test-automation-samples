// マイページ用のビルダーパターン
// Fluent Interfaceを実現し、ユーザー情報の検証を管理

import { MypagePage } from "../pages/mypagePage";
import { expect } from "@playwright/test";

export class MypagePageBuilder {
    private actions: (() => Promise<void>)[] = [];
    private validations: (() => Promise<void>)[] = [];

    constructor(private mypagePage: MypagePage) {}

    // Fluent Interfaceメソッド - アクション

    // ページ読み込み待機
    waitForPageLoad(): MypagePageBuilder {
        this.actions.push(async () => {
            await this.mypagePage.waitForPageLoad();
        });
        return this;
    }

    // Fluent Interfaceメソッド - 検証

    // ユーザー名の検証
    validateUsername(expectedUsername: string): MypagePageBuilder {
        this.validations.push(async () => {
            const actualUsername = await this.mypagePage.getUsername();
            await expect(actualUsername).toHaveText(expectedUsername);
        });
        return this;
    }

    // メールアドレスの検証
    validateEmail(expectedEmail: string): MypagePageBuilder {
        this.validations.push(async () => {
            const actualEmail = await this.mypagePage.getEmail();
            await expect(actualEmail).toHaveText(expectedEmail);
        });
        return this;
    }

    // ユーザー名の表示確認
    ensureUsernameVisible(): MypagePageBuilder {
        this.actions.push(async () => {
            const isVisible = await this.mypagePage.isUsernameVisible();
            await expect(isVisible).toBe(true);
        });
        return this;
    }

    // メールアドレスの表示確認
    ensureEmailVisible(): MypagePageBuilder {
        this.actions.push(async () => {
            const isVisible = await this.mypagePage.isEmailVisible();
            await expect(isVisible).toBe(true);
        });
        return this;
    }

    // 条件付きアクション
    conditionalAction(condition: boolean, action: (builder: MypagePageBuilder) => MypagePageBuilder): MypagePageBuilder {
        if (condition) {
            return action(this);
        }
        return this;
    }

    // すべてのアクションを実行
    async execute(): Promise<void> {
        for (const action of this.actions) {
            await action();
        }
    }

    // すべての検証を実行
    async validate(): Promise<void> {
        for (const validation of this.validations) {
            await validation();
        }
    }

    // アクションと検証をクリア（再利用時）
    clear(): MypagePageBuilder {
        this.actions = [];
        this.validations = [];
        return this;
    }
} 