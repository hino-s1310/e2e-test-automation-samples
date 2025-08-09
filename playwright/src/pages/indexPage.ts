// マイページのページオブジェクト
// ログイン後のユーザー情報表示ページ

import { Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class IndexPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

}