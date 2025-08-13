// 予約ページのページオブジェクト

import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class PlansPage extends BasePage {
    private planHeader: Locator;
    private planName: Locator;
    private reserveButton: Locator;


    constructor(page: Page) {
        super(page);
        this.planHeader = page.locator(".card-header");
        this.planName = page.locator("h5");
        this.reserveButton = page.locator("a");
    }

    // プランヘッダーを取得
    async getPlanHeader(planHeader: string): Promise<Locator> {
        return this.planHeader.filter({ hasText: planHeader });
    }

    // プラン名を取得
    async getPlanName(planName: string): Promise<Locator> {
        return this.planName.filter({ hasText: planName });
    }

    // 予約ボタンをクリック
    async clickReserveButton(planId: string): Promise<void> {
        this.reserveButton = this.page.locator(`a[href="./reserve.html?plan-id=${planId}"]`);
        await this.reserveButton.click();
    }

    // ページインスタンスを更新（要素のロケータも再初期化）
    updatePage(newPage: Page): void {
        super.updatePage(newPage);
        this.planHeader = newPage.locator(".card-header");
        this.planName = newPage.locator("h5");
        this.reserveButton = newPage.locator("a");
    }
}