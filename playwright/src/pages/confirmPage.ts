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

    // 予約ページのインスタンスを更新
    updatePage(newPage: any): void {
        this.page = newPage;
    }
}