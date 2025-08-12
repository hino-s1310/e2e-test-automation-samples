// ログインページ用のビルダーパターン
// Fluent Interfaceを実現し、複雑なワークフローを管理

import { ConfirmPage } from "../pages/confirmPage";
import { expect } from "@playwright/test";

export class ConfirmPageBuilder {
    private actions: (() => Promise<void>)[] = [];

    constructor(private confirmPage: ConfirmPage) {}

    // Fluent Interfaceメソッド

    // ページ読み込み待機
    waitForPageLoad(): ConfirmPageBuilder {
        this.actions.push(async () => {
            await this.confirmPage.waitForPageLoad();
        });
        return this;
    }

    // 合計金額の検証
    validateTotalBill(totalBill: string): ConfirmPageBuilder {
        this.actions.push(async () => {
            const actualTotalBill = await this.confirmPage.getTotalBill();
            expect(actualTotalBill).toHaveText(totalBill);
        });
        return this;
    }

    // 予約するボタンを押下
    clickReserveButton(): ConfirmPageBuilder {
        this.actions.push(async () => {
            await this.confirmPage.clickReserveButton();
        });
        return this;
    }

    // 閉じるボタンを押下
    clickCloseButton(): ConfirmPageBuilder {
        this.actions.push(async () => {
            await this.confirmPage.clickCloseButton();
        });
        return this;
    }

    // 条件付きアクション
    conditionalAction(condition: boolean, action: (builder: ConfirmPageBuilder) => ConfirmPageBuilder): ConfirmPageBuilder {
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
    clear(): ConfirmPageBuilder {
        this.actions = [];
        return this;
    }
} 