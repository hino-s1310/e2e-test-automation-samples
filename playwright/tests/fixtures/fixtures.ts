// fixtures.ts
import { test as base } from '@playwright/test';
import { LoginPage } from '../../src/pages/loginPage';
import { IndexPage } from '../../src/pages/indexPage';
import { MypagePage } from '../../src/pages/mypagePage';
import { SignupPage } from '../../src/pages/signupPage';
import { LoginFacade } from '../../src/facades/loginFacade';
import { SignupFacade } from '../../src/facades/signupFacade';
import { ReservationPage } from '../../src/pages/reservationPage';
import { PlansPage } from '../../src/pages/plansPage';
import { ReserveFacade } from '../../src/facades/reserveFacade';
import { ConfirmPage } from '../../src/pages/confirmPage';

type MyFixtures = {
  loginPage: LoginPage;
  indexPage: IndexPage;
  mypagePage: MypagePage;
  signupPage: SignupPage;
  loginFacade: LoginFacade;
  signupFacade: SignupFacade;
  reservationPage: ReservationPage;
  plansPage: PlansPage;
  reserveFacade: ReserveFacade;
  confirmPage: ConfirmPage;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  indexPage: async ({ page }, use) => {
    await use(new IndexPage(page));
  },
  mypagePage: async ({ page }, use) => {
    await use(new MypagePage(page));
  },
  signupPage: async ({ page }, use) => {
    await use(new SignupPage(page));
  },
  loginFacade: async ({ page }, use) => {
    await use(new LoginFacade(new LoginPage(page), new MypagePage(page)));
  },
  signupFacade: async ({ page }, use) => {
    await use(new SignupFacade(new SignupPage(page), new MypagePage(page)));
  },
  reservationPage: async ({ page }, use) => {
    await use(new ReservationPage(page));
  },
  plansPage: async ({ page }, use) => {
    await use(new PlansPage(page));
  },
  reserveFacade: async ({ page }, use) => {
    await use(new ReserveFacade(new ReservationPage(page), new PlansPage(page), new ConfirmPage(page)));
  },
  confirmPage: async ({ page }, use) => {
    await use(new ConfirmPage(page));
  }
});

export { expect } from '@playwright/test';
