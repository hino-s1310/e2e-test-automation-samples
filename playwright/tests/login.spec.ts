//ログイン機能テスト
import { loginUsers } from '../src/data/users';
import { test } from './fixtures/fixtures';

for (const user of loginUsers) { 
    test.describe(`ユーザー:${user.name}`, { tag: '@stable' }, () => {
        test.beforeEach(async ({ indexPage }) => {
            await indexPage.navigateTo('https://hotel-example-site.takeyaqa.dev/ja/index.html');
        });

        test(`ログイン機能テスト`, async ({ indexPage,loginFacade }) => {
            await indexPage.header.selectHeaderMenu('ログイン');
            await loginFacade.login(user.email, user.password);
            await loginFacade.validateUserInfo(user.name, user.email);
        });

        test.afterEach(async ({ mypagePage }) => {
            await mypagePage.header.selectHeaderMenu('ログアウト');
        });
    });
}


