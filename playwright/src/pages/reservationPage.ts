// 予約ページのページオブジェクト

import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class ReservationPage extends BasePage {
    private checkinDate: Locator;
    private stay: Locator;
    private guestCount: Locator;
    private confirmOption: Locator;
    private totalBill: Locator;
    private submitButton: Locator;

    constructor(page: Page) {
        super(page);
        this.checkinDate = page.getByRole("textbox", { name: "宿泊日 必須" });
        this.stay = page.getByRole("spinbutton", { name: "宿泊数 必須" });
        this.guestCount = page.getByRole("spinbutton", { name: "人数 必須" });
        this.confirmOption = page.getByRole("combobox", { name: "確認のご連絡 必須" });
        this.totalBill = page.locator("#total-bill");
        this.submitButton = page.getByRole("button", { name: "予約内容を確認する" });
    }

    // 予約日を入力
    async inputCheckinDate(checkinDate: string): Promise<void> {
        await this.checkinDate.fill(checkinDate);
    }

    // 宿泊数を入力
    async inputStay(stay: string): Promise<void> {
        await this.stay.fill(stay);
    }

    // 人数を入力
    async inputGuestCount(guestCount: string): Promise<void> {
        await this.guestCount.fill(guestCount);
    }

    // 確認オプションを入力
    async inputConfirmOption(confirmOption: string): Promise<void> {
        await this.confirmOption.selectOption(confirmOption);
    }

    // 合計金額を取得
    async getTotalBill(): Promise<Locator> {
        return this.totalBill;
    }

    // 予約内容を確認するボタン
    async clickSubmitButton(): Promise<void> {
        await this.submitButton.click();
    }
}