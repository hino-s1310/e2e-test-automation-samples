// 基底コンポーネントクラス
import { Page } from "@playwright/test";

export class BaseComponent {
    constructor(protected page: Page) {
        this.page = page;
    }
}