//新規登録機能テスト
import { signupUsers } from '../src/data/users';
import { test } from './fixtures/fixtures';

for (const user of signupUsers) { 
    test.describe(`ユーザー:${user.name}`, { tag: '@stable' }, () => {
        test.beforeEach(async ({ indexPage }) => {
            await indexPage.navigateTo('https://hotel-example-site.takeyaqa.dev/ja/index.html');
        });

        test('新規登録機能テスト', async ({ indexPage, signupFacade }) => {
            await indexPage.header.selectHeaderMenu('会員登録');
            await signupFacade.signup(user.name, user.email, user.password, user.confirmPassword);
            await signupFacade.validateUserInfo(user.name, user.email);
        });

        test.afterEach(async ({ mypagePage }) => {
            await mypagePage.header.selectHeaderMenu('ログアウト');
        });
    });
}
