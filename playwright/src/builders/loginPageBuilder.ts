// ログインページ用のビルダーパターン
// Fluent Interfaceを実現し、複雑なワークフローを管理

import { LoginPage } from "../pages/loginPage";

export class LoginPageBuilder {
    private actions: (() => Promise<void>)[] = [];

    constructor(private loginPage: LoginPage) {}

    // Fluent Interfaceメソッド
    email(email: string): LoginPageBuilder {
        this.actions.push(async () => {
            await this.loginPage.inputEmail(email);
        });
        return this;
    }

    password(password: string): LoginPageBuilder {
        this.actions.push(async () => {
            await this.loginPage.inputPassword(password);
        });
        return this;
    }

    clickLoginButton(): LoginPageBuilder {
        this.actions.push(async () => {
            await this.loginPage.clickLoginButton();
        });
        return this;
    }

    // 条件付きアクション
    conditionalAction(condition: boolean, action: (builder: LoginPageBuilder) => LoginPageBuilder): LoginPageBuilder {
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

    // アクションをクリア（再利用時）
    clear(): LoginPageBuilder {
        this.actions = [];
        return this;
    }
} 