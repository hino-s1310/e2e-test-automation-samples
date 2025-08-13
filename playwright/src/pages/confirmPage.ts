// 予約ページのページオブジェクト

import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class ConfirmPage extends BasePage {
    private totalBill: Locator;
    private reserveButton: Locator;
    private closeButton: Locator;

    constructor(page: Page) {
        super(page);
        this.totalBill = page.locator("#total-bill");
        this.reserveButton = page.getByRole("button", { name: "予約する" });
        this.closeButton = page.getByRole("button", { name: "閉じる" });
    }

    // 合計金額を取得
    async getTotalBill(): Promise<Locator> {
        return this.totalBill;
    }

    // 予約するボタンを押下
    async clickReserveButton(): Promise<void> {
        await this.reserveButton.click();
    }

    // 閉じるボタンを押下
    async clickCloseButton(): Promise<void> {
        await this.closeButton.click();
    }

    // ページインスタンスを更新（要素のロケータも再初期化）
    updatePage(newPage: Page): void {
        super.updatePage(newPage);
        this.totalBill = newPage.locator("#total-bill");
        this.reserveButton = newPage.getByRole("button", { name: "予約する" });
        this.closeButton = newPage.getByRole("button", { name: "閉じる" });
    }
}