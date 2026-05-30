import { test, expect, Page } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { LoginPage } from "../pages/loginPage";
import { readJson } from  '../utilities/jsonReader';

let loginPage: LoginPage;
let homePage: HomePage;

test('Verify My Account Drag and Drop', async ({ page }) => {
  await page.goto('http://localhost:100/');
  loginPage = new LoginPage(page);
  homePage = new HomePage(page);
  const testData = await readJson("Verify My Account Drag and Drop");
  await loginPage.login(testData.username, testData.password);
  await homePage.clickMyAccount();
  await homePage.clickCustomise();
  await homePage.dragDrop();
  let value = await homePage.validateDragandDrop();
  
  expect(value).toBe(testData.value);
  
  await page.close();
});

test('Verify Mouse Hover Link', async ({ page }) => {
  await page.goto('http://localhost:100/');
  loginPage = new LoginPage(page);
  homePage = new HomePage(page);
  const testData = await readJson("Verify Mouse Hover Link");
  await loginPage.login(testData.username, testData.password);
  //await page.waitForTimeout(5000);
  await homePage.mouseHover();
  //await page.waitForTimeout(5000);
  await homePage.clickNewVendor();
  //await page.waitForTimeout(2000);
  const isNewVendorPageDisplayed = await homePage.isNewVendorPageDisplayed();
  expect(isNewVendorPageDisplayed).toBeTruthy();
  await page.close();
});