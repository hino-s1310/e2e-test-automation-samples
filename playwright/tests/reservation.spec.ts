//ログイン機能テスト
import { loginUsers, plan, reservation, confirm } from '../src/data';
import { test } from './fixtures/fixtures';

const loginUser = loginUsers[0];

test.describe(`ユーザー:${loginUser.name}`, { tag: '@stable' }, () => {
    test.beforeEach(async ({ indexPage }) => {
        await indexPage.navigateTo('https://hotel-example-site.takeyaqa.dev/ja/index.html');
    });

    test(`予約機能テスト`, async ({ indexPage,mypagePage,loginFacade,reserveFacade }) => {

        // ログイン処理
        await indexPage.header.selectHeaderMenu('ログイン');
        await loginFacade.login(loginUser.email, loginUser.password);
        await loginFacade.validateUserInfo(loginUser.name, loginUser.email);

        // 予約処理
        await mypagePage.header.selectHeaderMenu('宿泊予約');
        await reserveFacade.reserve(plan, reservation, confirm);
        
    });

    test.afterEach(async ({ mypagePage }) => {
        await mypagePage.header.selectHeaderMenu('ログアウト');
    });
});



