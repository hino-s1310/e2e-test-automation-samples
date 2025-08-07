// Facadeパターンを使用したログインファサード
// 複雑なワークフローを単純なインターフェースで提供

import { LoginPage } from "../pages/loginPage";
import { LoginPageBuilder } from "../builders/loginPageBuilder";
import { MypagePageBuilder } from "../builders/mypagePageBuilder";
import { MypagePage } from "../pages/mypagePage";

export class LoginFacade {
    private loginPageBuilder: LoginPageBuilder;
    private mypagePageBuilder: MypagePageBuilder;

    constructor(private loginPage: LoginPage, private mypagePage: MypagePage) {
        this.loginPageBuilder = new LoginPageBuilder(loginPage);
        this.mypagePageBuilder = new MypagePageBuilder(mypagePage);
    }

    // ログイン
    async login(email: string, password: string): Promise<void> {
        await this.loginPageBuilder
            .email(email)
            .password(password)
            .clickLoginButton()
            .execute();
    }

    // ユーザー情報の検証のみ
    async validateUserInfo(username: string, email: string): Promise<void> {
        try {
            const isValid = await this.mypagePageBuilder
                .waitForPageLoad()
                .ensureUsernameVisible()
                .ensureEmailVisible()
                .validateUsername(username)
                .validateEmail(email)
                .validate();
            
            if (!isValid) {
                throw new Error(`User info validation failed for user: ${username}`);
            }
        } catch (error) {
            console.error('Validation error:', error);
            throw error;
        }
    }
}