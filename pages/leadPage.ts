import { Page } from "@playwright/test";

export class LeadPage {
    page:Page;
    constructor(page:Page)
    {
        this.page = page;
    }

    loc_tb_lastname = '//input[@name="lastname"]';
    loc_tb_company = '//input[@name="company"]';
    loc_btn_save = '(//input[@name="button"])[1]';
    loc_txt_lastName = '//td[contains(text(),"Last Name")]/following::td[1]';
    loc_txt_company = '//td[contains(text(),"Company")]/following::td[1]';


    async createlead (lastname:string, company: string):Promise<void>
    {
        await this.setLastName(lastname);
        await this.setCompany(company);
        await this.clickSave();
    }
    
    async setLastName(lastname:string):Promise<void>
    {
        await this.page.fill(this.loc_tb_lastname,lastname);
    }

    async setCompany(company:string):Promise<void>
    {
        await this.page.fill(this.loc_tb_company,company);
    }

    async clickSave():Promise<void>
    {
        await this.page.click(this.loc_btn_save);
    }

    async isLastNameDisplayed():Promise<boolean>
    {
        return this.page.isVisible(this.loc_txt_lastName);
    }

    async isCompanyDisplayed():Promise<boolean>
    {
        return this.page.isVisible(this.loc_txt_company);
    }
}