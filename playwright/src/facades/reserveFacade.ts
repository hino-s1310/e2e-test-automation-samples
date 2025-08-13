// Facadeパターンを使用したログインファサード
// 複雑なワークフローを単純なインターフェースで提供

import { ReservationPage } from "../pages/reservationPage";
import { ReservationPageBuilder } from "../builders/reservationPageBuilder";
import { PlansPage } from "../pages/plansPage";
import { PlansPageBuilder } from "../builders/plansPageBuilder";
import { ConfirmPage } from "../pages/confirmPage";
import { ConfirmPageBuilder } from "../builders/confirmPageBuilder";

export class ReserveFacade {
    private reservationPageBuilder: ReservationPageBuilder;
    private plansPageBuilder: PlansPageBuilder;
    private confirmPageBuilder: ConfirmPageBuilder;

    constructor(private reservationPage: ReservationPage, private plansPage: PlansPage, private confirmPage: ConfirmPage) {
        this.reservationPageBuilder = new ReservationPageBuilder(reservationPage);
        this.plansPageBuilder = new PlansPageBuilder(plansPage);
        this.confirmPageBuilder = new ConfirmPageBuilder(confirmPage);
    }

    // 予約処理
    async reserve(plan: { header: string, name: string, id: string }, reservation: { checkinDate: string, stay: string, guestCount: string, confirmOption: string, totalBill: string }, confirm: { totalBill: string }): Promise<void> {
        
        // プラン情報の検証（最初の実行）
        await this.plansPageBuilder
            .waitForPageLoad()
            .validatePlanHeader(plan.header)
            .validatePlanName(plan.name)
            .execute();
        // 前回のアクションをクリア（ビルダーはexecute後にクリアされないため）
        this.plansPageBuilder.clear();

        // ポップアップを待機しつつクリックを実行（レースコンディション回避）
        const [popupPage] = await Promise.all([
            this.plansPage.getPage().context().waitForEvent('page'),
            (async () => {
                await this.plansPageBuilder
                    .waitForPageLoad()
                    .clickReserveButton(plan.id)
                    .execute();
                this.plansPageBuilder.clear();
            })()
        ]);

        // ポップアップの読み込み完了を待機し、前面に表示
        await popupPage.waitForLoadState('load');
        await popupPage.bringToFront();

        // 予約ページと確認ページのインスタンスをポップアップページに切り替え
        this.reservationPage.updatePage(popupPage);
        this.reservationPageBuilder.updatePage(popupPage);
        this.confirmPage.updatePage(popupPage);

        // 予約情報入力処理
        await this.reservationPageBuilder
            .waitForPageLoad()
            .inputCheckinDate(reservation.checkinDate)
            .inputStay(reservation.stay)
            .inputGuestCount(reservation.guestCount)
            .inputConfirmOption(reservation.confirmOption)
            .validateTotalBill(reservation.totalBill)
            .clickReserveButton()
            .execute();

        // 予約確認処理
        await this.confirmPageBuilder
            .waitForPageLoad()
            .validateTotalBill(confirm.totalBill)
            .clickReserveButton()
            .execute();
    }
}