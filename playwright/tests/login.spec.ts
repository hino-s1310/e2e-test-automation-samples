//ログイン機能テスト
import { test } from '@playwright/test';
import { LoginFacade } from '../src/facades/loginFacade';
import { LoginPage } from '../src/pages/loginPage';
import { MypagePage } from '../src/pages/mypagePage';
import { IndexPage } from '../src/pages/indexPage';
import { loginUsers } from '../src/data/users';

for (const user of loginUsers) { 
    test.describe(`ユーザー${user.name}`, () => {
        test.beforeEach(async ({ page }) => {
            await page.goto('https://hotel-example-site.takeyaqa.dev/ja/index.html');
        });

        test(`ログイン機能テスト`, async ({ page }) => {
            const indexPage = new IndexPage(page);
            const loginPage = new LoginPage(page);
            const mypagePage = new MypagePage(page);
            
            await indexPage.header.selectHeaderMenu('ログイン');
            const loginFacade = new LoginFacade(loginPage, mypagePage);
            await loginFacade.login(user.email, user.password);
            await loginFacade.validateUserInfo(user.name, user.email);
            
            });

        test.afterEach(async ({ page }) => {
            const mypagePage = new MypagePage(page);
            await mypagePage.header.selectHeaderMenu('ログアウト');
        });
    });
}


