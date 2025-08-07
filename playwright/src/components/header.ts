// 基底コンポーネントクラス
import { Page, Locator } from "@playwright/test";
import { BaseComponent } from "./baseComponent";

export type HeaderMenu = "ホーム" | "宿泊予約" | "会員登録" | "マイページ" | "ログイン" | "ログアウト";

export class Header extends BaseComponent {

    private homeLink: Locator;
    private reservationLink: Locator;
    private registrationLink: Locator;
    private myPageLink: Locator;
    private loginButton: Locator;
    private logoutButton: Locator;


    constructor(protected page: Page) {
        super(page);
        this.homeLink = page.getByRole("link", { name: "ホーム" });
        this.reservationLink = page.getByRole("link", { name: "宿泊予約" });
        this.registrationLink = page.getByRole("link", { name: "会員登録" });
        this.myPageLink = page.getByRole("link", { name: "マイページ" });
        this.loginButton = page.getByRole("button", { name: "ログイン" });
        this.logoutButton = page.getByRole("button", { name: "ログアウト" });
    }

    //ヘッダーを選択
    async selectHeaderMenu(menu: HeaderMenu) {
        switch (menu) {
            case "ホーム":
                await this.homeLink.click();
                break;
            case "宿泊予約":
                await this.reservationLink.click();
                break;
            case "会員登録":
                await this.registrationLink.click();
                break;
            case "マイページ":
                await this.myPageLink.click();
                break;
            case "ログイン":    
                await this.loginButton.click();
                break;
            case "ログアウト":
                await this.logoutButton.click();
                break;
            default:
                throw new Error(`Invalid menu: ${menu}`);
        }
    }
}