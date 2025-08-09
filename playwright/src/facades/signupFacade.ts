// Facadeパターンを使用したログインファサード
// 複雑なワークフローを単純なインターフェースで提供

import { SignupPage } from "../pages/signupPage";
import { SignupPageBuilder } from "../builders/signupPageBuilder";
import { MypagePage } from "../pages/mypagePage";
import { MypagePageBuilder } from "../builders/mypagePageBuilder";

export class SignupFacade {
    private signupPageBuilder: SignupPageBuilder;
    private mypagePageBuilder: MypagePageBuilder;

    constructor(private signupPage: SignupPage, private mypagePage: MypagePage) {
        this.signupPageBuilder = new SignupPageBuilder(signupPage);
        this.mypagePageBuilder = new MypagePageBuilder(mypagePage);
    }

    // ログイン
    async signup(username: string, email: string, password: string, confirmPassword: string): Promise<void> {
        await this.signupPageBuilder
            .username(username)
            .email(email)
            .password(password)
            .confirmPassword(confirmPassword)
            .clickSignupButton()
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