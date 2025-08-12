// 予約ページのページオブジェクト

import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class PlansPage extends BasePage {
    private planHeader: Locator;
    private planName: Locator;
    private reserveButton: Locator;


    constructor(page: Page) {
        super(page);
        this.planHeader = page.locator("#card-header").first();
        this.planName = page.locator("h5").first();
        this.reserveButton = page.getByRole("link", { name: "このプランで予約" }).first();
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
        await this.reserveButton.click();
    }
}