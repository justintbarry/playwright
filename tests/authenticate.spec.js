// @ts-check
const { test, expect } = require('@playwright/test');

test('authenticate', async ({ page }) => {
  await page.goto('https://syful.com/ghost/#/signin'); // Navigates to authentication portal
  await expect(page).toHaveTitle(/Sign In - Syful/); // Checks that the expected web page was loaded
  if (!process.env.EMAIL) {
    throw new ReferenceError('EMAIL parameter is missing. Ensure program is executed with EMAIL and PASSWORD parameters assigned to valid string data.');
  } else {
    await page.getByLabel('Email address').fill(process.env.EMAIL); // Fills the Email address input field with the EMAIL parameter
  }
  if (!process.env.PASSWORD) {
    throw new ReferenceError('PASSWORD parameter is missing. Ensure program is executed with EMAIL and PASSWORD parameters assigned to valid string data.');
  } else {
    await page.getByLabel('Password').fill(process.env.PASSWORD); // Fills the Password input field with the PASSWORD parameter
  }
  await page.getByRole('button', { name: 'Sign in →' }).click(); // Selects the Sign in Call to Action button
  await expect(page).toHaveTitle(/Posts - Syful/); // Checks the title of the page to ensure the user is successfully signed in
});