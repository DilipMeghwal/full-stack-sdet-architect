import { test, expect } from '../../../fixtures/base.fixture';
import { LoginPage } from '../../../pages/login.page';
import { request } from '@playwright/test';

test.describe('Login Tests', () => {

  test.beforeAll(async ({ playwright }) => {
    // Initialize database to ensure john/demo exists
    const requestContext = await playwright.request.newContext({
        baseURL: process.env.API_BASE_URL || 'http://localhost:8080/parabank/services/bank/'
    });
    const response = await requestContext.post('initializeDB');
    expect(response.status(), 'Failed to initialize database').toBe(200);
    await requestContext.dispose();
  });

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto('index.htm');
  });

  test('User can register and then login successfully', async ({ page, loginPage }) => {
    const username = `user_${Date.now()}`;
    await page.goto('register.htm');
    await page.fill('input[name="customer.firstName"]', 'Test');
    await page.fill('input[name="customer.lastName"]', 'User');
    await page.fill('input[name="customer.address.street"]', '123 Main St');
    await page.fill('input[name="customer.address.city"]', 'Boston');
    await page.fill('input[name="customer.address.state"]', 'MA');
    await page.fill('input[name="customer.address.zipCode"]', '02110');
    await page.fill('input[name="customer.phoneNumber"]', '123-456-7890');
    await page.fill('input[name="customer.ssn"]', '123-45-6789');
    await page.fill('input[name="customer.username"]', username);
    await page.fill('input[name="customer.password"]', 'password');
    await page.fill('#repeatedPassword', 'password');
    await page.click('input[value="Register"]');

    await expect(page.locator('#rightPanel h1.title').filter({ hasText: `Welcome ${username}` }), 'Registration welcome message should be visible').toBeVisible();
    
    // Now logout and login back
    await page.click('text=Log Out');
    await loginPage.login(username, 'password');
    await expect(page, 'User should be redirected to the overview page after login').toHaveURL(/.*overview.htm/);
    await expect(page.locator('#rightPanel h1.title').filter({ hasText: LoginPage.MSG_SUCCESS }), 'Accounts Overview title should be visible after successful login').toBeVisible();
  });

  test('User cannot login with invalid username', async ({ loginPage, page }) => {
    await loginPage.login('invalidUser', 'password');
    await expect(page.locator(loginPage.errorMsg), 'Error message should be visible for invalid credentials').toBeVisible();
    await expect(page.locator(loginPage.errorMsg), 'Incorrect error message shown for invalid credentials').toHaveText(LoginPage.ERROR_INVALID_CREDENTIALS);
  });

  test('User cannot login with invalid password', async ({ loginPage, page }) => {
    await loginPage.login('john', 'invalidPassword');
    await expect(page.locator(loginPage.errorMsg), 'Error message should be visible for invalid credentials').toBeVisible();
    await expect(page.locator(loginPage.errorMsg), 'Incorrect error message shown for invalid credentials').toHaveText(LoginPage.ERROR_INVALID_CREDENTIALS);
  });

  test('User cannot login with empty fields', async ({ loginPage, page }) => {
    await loginPage.login('', '');
    await expect(page.locator(loginPage.errorMsg), 'Error message should be visible for empty fields').toBeVisible();
    await expect(page.locator(loginPage.errorMsg), 'Incorrect error message shown for empty fields').toHaveText(LoginPage.ERROR_EMPTY_FIELDS);
  });

});