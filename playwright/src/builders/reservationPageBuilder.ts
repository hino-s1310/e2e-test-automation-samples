// ログインページ用のビルダーパターン
// Fluent Interfaceを実現し、複雑なワークフローを管理

import { ReservationPage } from "../pages/reservationPage";
import { expect } from "@playwright/test";

export class ReservationPageBuilder {
    private actions: (() => Promise<void>)[] = [];

    constructor(private reservationPage: ReservationPage) {}

    // Fluent Interfaceメソッド
    waitForPageLoad(): ReservationPageBuilder {
        this.actions.push(async () => {
            await this.reservationPage.waitForPageLoad();
        });
        return this;
    }

    // 予約日を入力
    inputCheckinDate(checkinDate: string): ReservationPageBuilder {
        this.actions.push(async () => {
            await this.reservationPage.inputCheckinDate(checkinDate);
        });
        return this;
    }

    // 宿泊数を入力
    inputStay(stay: string): ReservationPageBuilder {
        this.actions.push(async () => {
            await this.reservationPage.inputStay(stay);
        });
        return this;
    }

    // 人数を入力
    inputGuestCount(guestCount: string): ReservationPageBuilder {
        this.actions.push(async () => {
            await this.reservationPage.inputGuestCount(guestCount);
        });
        return this;
    }

    // 確認オプションを入力
    inputConfirmOption(confirmOption: string): ReservationPageBuilder {
        this.actions.push(async () => {
            await this.reservationPage.inputConfirmOption(confirmOption);
        });
        return this;
    }

    // 合計金額を検証
    validateTotalBill(totalBill: string): ReservationPageBuilder {
        this.actions.push(async () => {
            const actualTotalBill = await this.reservationPage.getTotalBill();
            expect(actualTotalBill).toHaveText(totalBill);
        });
        return this;
    }

    // 予約ボタンをクリック
    clickReserveButton(): ReservationPageBuilder {
        this.actions.push(async () => {
            await this.reservationPage.clickSubmitButton();
        });
        return this;
    }

    // 条件付きアクション
    conditionalAction(condition: boolean, action: (builder: ReservationPageBuilder) => ReservationPageBuilder): ReservationPageBuilder {
        if (condition) {
            return action(this);
        }
        return this;
    }

    // すべてのアクションを実行
    async execute(): Promise<void> {
        for (const action of this.actions) {
            await action();
        }
    }

    // アクションをクリア（再利用時）
    clear(): ReservationPageBuilder {
        this.actions = [];
        return this;
    }

    // ページインスタンスを更新
    updatePage(newPage: any): void {
        this.reservationPage.updatePage(newPage);
    }
} 