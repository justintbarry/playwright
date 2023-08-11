// @ts-check
const { test, expect } = require('@playwright/test');

test('authenticate', async ({ page }) => {
  await page.goto('https://syful.com/ghost/#/signin');
  await expect(page).toHaveTitle(/Sign In - Syful/);
  if (!process.env.EMAIL) {
    console.error("Expected script to be executed with EMAIL parameter assigned to a string.");
  } else {
    const email = process.env.EMAIL;
    await page.getByLabel('Email address').fill(email);
  }
  if (!process.env.PASSWORD) {
    console.error("Expected script to be executed with PASSWORD parameter assigned to a string.");
  } else {
    const password = process.env.PASSWORD;
    await page.getByLabel('Password').fill(password);
  }
  await page.getByRole('button', { name: 'Sign in →' }).click();
  await expect(page).toHaveTitle(/Posts - Syful/);
});