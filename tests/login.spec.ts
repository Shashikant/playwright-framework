import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { HomePage } from '../pages/homePage';
import { LeadPage } from '../pages/leadPage';
import { readJson } from  '../utilities/jsonReader';


let loginPage: LoginPage;
let homePage: HomePage;
let leadPage: LeadPage;

test('Verify_title_TC01', async ({ page }) => {
  await page.goto('http://localhost:100/');
  const testData = await readJson("./testdata/data.json","Verify_title_TC01");
  await expect(page).toHaveTitle(testData.title);
  await page.close();  
});

test('Verify_logo_TC02', async ({ page }) => {
  await page.goto('http://localhost:100/');
  loginPage = new LoginPage(page);
  const isLogoDisplayed = await loginPage.isLogoDisplayed();
  expect(isLogoDisplayed).toBe(true);
  await page.close();  
});

test('Verify_invalidlogin_TC03', async ({ page }) => {
  await page.goto('http://localhost:100/');
  loginPage = new LoginPage(page);
  const testData = await readJson("./testdata/data.json","Verify_invalidlogin_TC03");
  await loginPage.login(testData.username, testData.password);
  const isErrorMessageDisplayed = await loginPage.isErrorMessageDisplayed();
  expect(isErrorMessageDisplayed).toBe(true);
  await page.close();  
});

test('Verify_validlogin_TC04', async ({ page }) => {
  await page.goto('http://localhost:100/');
  loginPage = new LoginPage(page);
  const testData = await readJson("./testdata/data.json","Verify_validlogin_TC04");
  await loginPage.login(testData.username, testData.password);
  homePage = new HomePage(page);
  const isWelcomeMsgDisplayed = await homePage.isWelcomeMsgDisplayed();
  console.log(isWelcomeMsgDisplayed);
  expect(isWelcomeMsgDisplayed).toBe(true);
  await page.waitForTimeout(3000);
  homePage.clickLogout()
  await page.waitForTimeout(3000);
  const isLogoDisplayed = await loginPage.isLogoDisplayed();
  expect(isLogoDisplayed).toBe(true);
  await page.close();  
});

test('Verify_Create_NewLead_Mandatory_Fields_TC05', async ({ page }) => {
  await page.goto('http://localhost:100/');
  loginPage = new LoginPage(page);
  const testData = await readJson("./testdata/data.json","Verify_Create_NewLead_Mandatory_Fields_TC05");
  await loginPage.login(testData.username, testData.password);
  await page.waitForTimeout(3000);
  homePage = new HomePage(page); 
  homePage.clickNewLead();
  await page.waitForTimeout(3000);
  leadPage = new LeadPage(page);
  await leadPage.createlead(testData.lastname, testData.company);
  await page.waitForTimeout(3000);
  const isLastNameDisplayed = await leadPage.isLastNameDisplayed();
  expect(isLastNameDisplayed).toBe(true);

  const isCompanyDisplayed = await leadPage.isCompanyDisplayed();
  expect(isCompanyDisplayed).toBe(true);
  
  homePage.clickLogout()
  await page.waitForTimeout(3000);
  const isLogoDisplayed = await loginPage.isLogoDisplayed();
  expect(isLogoDisplayed).toBe(true);
  await page.close();  
});