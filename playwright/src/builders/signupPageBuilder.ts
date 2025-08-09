// ログインページ用のビルダーパターン
// Fluent Interfaceを実現し、複雑なワークフローを管理

import { SignupPage } from "../pages/signupPage";

export class SignupPageBuilder {
    private actions: (() => Promise<void>)[] = [];

    constructor(private signupPage: SignupPage) {}

    // Fluent Interfaceメソッド
    username(username: string): SignupPageBuilder {
        this.actions.push(async () => {
            await this.signupPage.inputUsername(username);
        });
        return this;
    }

    email(email: string): SignupPageBuilder {
        this.actions.push(async () => {
            await this.signupPage.inputEmail(email);
        });
        return this;
    }

    password(password: string): SignupPageBuilder {
        this.actions.push(async () => {
            await this.signupPage.inputPassword(password);
        });
        return this;
    }

    confirmPassword(confirmPassword: string): SignupPageBuilder {
        this.actions.push(async () => {
            await this.signupPage.inputConfirmPassword(confirmPassword);
        });
        return this;
    }

    clickSignupButton(): SignupPageBuilder {
        this.actions.push(async () => {
            await this.signupPage.clickSignupButton();
        });
        return this;
    }

    // 条件付きアクション
    conditionalAction(condition: boolean, action: (builder: SignupPageBuilder) => SignupPageBuilder): SignupPageBuilder {
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
    clear(): SignupPageBuilder {
        this.actions = [];
        return this;
    }
} 