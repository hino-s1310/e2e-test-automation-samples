// 基底コンポーネントクラス
import { Page } from "@playwright/test";

export class BaseComponent {
    constructor(protected page: Page) {
        this.page = page;
    }

    // ページインスタンスを更新
    updatePage(newPage: Page): void {
        (this as any).page = newPage;
    }
}