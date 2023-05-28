import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { Enviroment } from '../src/core/dataHandler';

let env: Enviroment = new Enviroment(process.env.ENV!);
export class ProfilePage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly PROFILE_DROPDOWN_MENU: Locator;
    readonly PROFILE_DETAILS_BUTTON: Locator;
    readonly PERSONAL_TEXT: Locator;
    readonly BIRTHDATE_YEAR: Locator;
    readonly BIRTHDATE_MONTH: Locator;
    readonly BIRTHDATE_DAY: Locator;
    readonly SIGNATURE: Locator;
    readonly LOCATION: Locator;
    readonly AVATAR_URL_MENU: Locator;
    readonly AVATAR_URL_INPUT: Locator;
    readonly SAVE_BUTTON: Locator;
    readonly SUCCESS_MESSAGE: Locator;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        this.PROFILE_DROPDOWN_MENU = this.page.getByRole('link', { name: '▼' });
        this.PROFILE_DETAILS_BUTTON = this.page.getByRole('link', { name: 'Detalles del Perfil' });
        this.PERSONAL_TEXT = this.page.getByLabel('Texto Personal');
        this.BIRTHDATE_YEAR = this.page.locator('input[name="bday3"]');
        this.BIRTHDATE_MONTH = this.page.locator('input[name="bday1"]');
        this.BIRTHDATE_DAY = this.page.locator('input[name="bday2"]');
        this.SIGNATURE = this.page.locator('#signature');
        this.LOCATION = this.page.locator('[id="customfield\\[cust_loca\\]"]');
        this.AVATAR_URL_MENU = this.page.getByText('Especificar avatar mediante URL');
        this.AVATAR_URL_INPUT = this.page.locator('input[name="userpicpersonal"]');
        this.SAVE_BUTTON = this.page.getByRole('button', { name: 'Cambiar perfil' });
        this.SUCCESS_MESSAGE = this.page.getByText('Se ha actualizado correctamente tu perfil');
    }

    async navigateToURL(): Promise<void> {
        await this.page.goto(env.baseURL);
    }

    async clickProfileDropdownMenu(): Promise<void> {
        await this.PROFILE_DROPDOWN_MENU.click();
    }

    async clickProfileDetailsButton(): Promise<void> {
        await this.PROFILE_DETAILS_BUTTON.click();
    }

    async fillBirthdate(year: string, month: string, day: string): Promise<void> {
        await this.BIRTHDATE_YEAR.fill(year);
        await this.BIRTHDATE_MONTH.fill(month);
        await this.BIRTHDATE_DAY.fill(day);
    }

    async fillPersonalText(text: string): Promise<void> {
        await this.PERSONAL_TEXT.fill(text);
    }

    async fillSignature(text: string): Promise<void> {
        await this.SIGNATURE.fill(text);
    }

    async fillLocation(text: string): Promise<void> {
        await this.LOCATION.fill(text);
    }

    async clickAvatarUrlMenu(): Promise<void> {
        await this.AVATAR_URL_MENU.click();
    }

    async fillAvatarUrl(text: string): Promise<void> {
        await this.AVATAR_URL_INPUT.fill(text);
    }

    async clikSaveProfileChanges(): Promise<void> {
        await this.SAVE_BUTTON.click();
    }

    async verifySuccessMessage(): Promise<void> {
        await expect(this.SUCCESS_MESSAGE, 'Should have profile updated sucessfully').toBeVisible();
    }

    async cleanProfile(): Promise<void> {
        await this.fillBirthdate('', '', '');
        await this.fillPersonalText('');
        await this.fillSignature('');
        await this.fillLocation('');
        await this.clickAvatarUrlMenu();
        await this.fillAvatarUrl('');
        await this.clikSaveProfileChanges();
    }

}