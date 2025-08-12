// ログインページ用のビルダーパターン
// Fluent Interfaceを実現し、複雑なワークフローを管理

import { PlansPage } from "../pages/plansPage";
import { expect } from "@playwright/test";

export class PlansPageBuilder {
    private actions: (() => Promise<void>)[] = [];

    constructor(private plansPage: PlansPage) {}

    // Fluent Interfaceメソッド

    // ページ読み込み待機
    waitForPageLoad(): PlansPageBuilder {
        this.actions.push(async () => {
            await this.plansPage.waitForPageLoad();
        });
        return this;
    }

    validatePlanHeader(planHeader: string): PlansPageBuilder {
        this.actions.push(async () => {
            const planHeaderLocator = await this.plansPage.getPlanHeader(planHeader);
            expect(planHeaderLocator).toBeVisible();
        });
        return this;
    }

    validatePlanName(planName: string): PlansPageBuilder {
        this.actions.push(async () => {
            const planNameLocator = await this.plansPage.getPlanName(planName);
            expect(planNameLocator).toBeVisible();
        });
        return this;
    }

    clickReserveButton(planId: string): PlansPageBuilder {
        this.actions.push(async () => {
            await this.plansPage.clickReserveButton(planId);
        });
        return this;
    }

    // 条件付きアクション
    conditionalAction(condition: boolean, action: (builder: PlansPageBuilder) => PlansPageBuilder): PlansPageBuilder {
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
    clear(): PlansPageBuilder {
        this.actions = [];
        return this;
    }
} 