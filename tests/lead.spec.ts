import { test, expect, Page } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { LoginPage } from "../pages/loginPage";
import { readJson } from '../utilities/jsonReader';
import { LeadPage } from "../pages/leadPage";

let loginPage: LoginPage;
let homePage: HomePage;
let leadPage: LeadPage;

test('Handle_Dialogue_Message_Creating_New_Lead_TC_001', async ({ page }) => {
    await page.goto('http://localhost:100/');
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    leadPage = new LeadPage(page);
    const testData = await readJson("./testdata/leadData.json", "Handle_Dialogue_Message_Creating_New_Lead_TC_001");
    await loginPage.login(testData.username, testData.password);
    await homePage.clickNewLead();
    const alertPromise = leadPage.handleVerifyDialogue()
    await leadPage.clickSave();
    const alertText = await alertPromise;
    expect(alertText).toBe("Last Name cannot be empty");
    await leadPage.setLastName(testData.lastname);
    const alertPromise2 = leadPage.handleVerifyDialogue();
    await leadPage.clickSave();
    const alertText2 = await alertPromise2;
    expect(alertText2).toBe("Company cannot be empty");
    await leadPage.clickSave();
    await leadPage.setCompany(testData.company);
    await leadPage.clickSave();
    await page.close();
});

test('Handle_Dialogue_Message_Existing_Lead_TC_002', async ({ page }) => {
    await page.goto('http://localhost:100/');
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    leadPage = new LeadPage(page);
    const testData = await readJson("./testdata/leadData.json", "Handle_Dialogue_Message_Existing_Lead_TC_002");
    await loginPage.login(testData.username, testData.password);
    await homePage.clickLeads();
    await leadPage.findLastName(testData.lastname);
    await leadPage.clickSearchButton();
    const alertPromise = leadPage.handleDismissConfirm();
    await leadPage.clickDelete();
    const alertText = await alertPromise;
    expect(alertText).toBe("Are you sure?");

    const alertPromise2 = leadPage.handleAcceptConfirm();
    await leadPage.clickDelete();
    const alertText2 = await alertPromise2;
    expect(alertText).toBe("Are you sure?");

    //await page.close();
});