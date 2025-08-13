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

    // 宿泊日を入力
    async inputCheckinDate(checkinDate: string): Promise<void> {

        //　inputフィールドをクリック
        await this.checkinDate.click();
        // 日付フィールドをクリアしてから入力
        await this.checkinDate.clear();
        await this.checkinDate.fill(checkinDate);

        // 合計金額をクリック
        await this.totalBill.click();
    }

    // 宿泊数を入力
    async inputStay(stay: string): Promise<void> {
        //　inputフィールドをクリアしてから入力
        await this.stay.clear();
        await this.stay.fill(stay);

        // 合計金額をクリック
        await this.totalBill.click();
    }

    // 人数を入力
    async inputGuestCount(guestCount: string): Promise<void> {
        //　inputフィールドをクリアしてから入力
        await this.guestCount.clear();
        await this.guestCount.fill(guestCount);

        // 合計金額をクリック
        await this.totalBill.click();
    }

    // 確認オプションを入力
    async inputConfirmOption(confirmOption: string): Promise<void> {
        //　inputフィールドを選択
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

    // ページインスタンスを更新（要素のロケータも再初期化）
    updatePage(newPage: Page): void {
        super.updatePage(newPage);
        this.checkinDate = newPage.getByRole("textbox", { name: "宿泊日 必須" });
        this.stay = newPage.getByRole("spinbutton", { name: "宿泊数 必須" });
        this.guestCount = newPage.getByRole("spinbutton", { name: "人数 必須" });
        this.confirmOption = newPage.getByRole("combobox", { name: "確認のご連絡 必須" });
        this.totalBill = newPage.locator("#total-bill");
        this.submitButton = newPage.getByRole("button", { name: "予約内容を確認する" });
    }
}