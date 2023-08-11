# Playwright
Example uses for Playwright

## Highlights

### Run a function in the context of a web page

[tests/example_page_evaluate.spec.js](tests/example_page_evaluate.spec.js)
```js title="tests/example_page_evaluate.spec.js"
// @ts-check
const { test, expect } = require('@playwright/test');

// Define an example test to illustrate running a function that was initially defined in the Playwright code in the context of a web page (as opposed to running it in the Playwright environment).

test('scrape HTML from dropdown menu', async ({ page }) => {
  // Navigate to a web page
  await page.goto('https://playwright.dev/');
  
  // Run JavaScript code to find an HTML element within a web page by its class name
  // Select the string of HTML within that element and assign it to a variable
  const dropdown_menu_html = await page.evaluate(() => document.getElementsByClassName('dropdown__menu')[0].innerHTML);
  // Print the variable to the console
  console.log(dropdown_menu_html);
});
```