//ログイン機能テスト
import { loginUsers } from '../src/data/users';
import { test } from './fixtures/fixtures';

const loginUser = loginUsers[0];
const plan = {
    header: "⭐おすすめプラン⭐",
    name: "お得な特典付きプラン",
    id: "0"
}

const reservation = {
    checkinDate: "2025-08-13",
    stay: "1",
    guestCount: "2",
    confirmOption: "希望しない",
    totalBill: "28,000円",
}

const confirm = {
    totalBill: "合計 28,000円（税込み）",
}

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



