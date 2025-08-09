//新規登録機能テスト
import { test } from '@playwright/test';
import { SignupPage } from '../src/pages/signupPage';
import { SignupFacade } from '../src/facades/signupFacade';
import { MypagePage } from '../src/pages/mypagePage';
import { IndexPage } from '../src/pages/indexPage';
import { signupUsers } from '../src/data/users';

for (const user of signupUsers) { 
    test.describe(`ユーザー${user.name}`, { tag: '@stable' }, () => {
        test.beforeEach(async ({ page }) => {
            await page.goto('https://hotel-example-site.takeyaqa.dev/ja/index.html');
        });

        test('新規登録機能テスト', async ({ page }) => {
            const indexPage = new IndexPage(page);
            await indexPage.header.selectHeaderMenu('会員登録');
            const signupPage = new SignupPage(page);
            const mypagePage = new MypagePage(page);
            const signupFacade = new SignupFacade(signupPage, mypagePage);
            await signupFacade.signup(user.name, user.email, user.password, user.confirmPassword);
            await signupFacade.validateUserInfo(user.name, user.email);
        });

        test.afterEach(async ({ page }) => {
            const mypagePage = new MypagePage(page);
                await mypagePage.header.selectHeaderMenu('ログアウト');
            });
        });
}
