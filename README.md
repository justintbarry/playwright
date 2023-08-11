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
### Authenticate with a web application

[tests/authenticate.spec.js](tests/authenticate.spec.js)
```js title="tests/authenticate.spec.js"
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
```

This test must be run with EMAIL and PASSWORD parameters initialized to strings. Ideally, this would be accomplished programmatically using a Secrets Management Tool, however, these parameters can also be provided manually. To avoid leaving credentials in the terminal history, it's best not to type the email and password directly into the terminal. Instead, the `read` Bash keyword can be used to prompt the user to enter the credentials securely.

1. `echo -n "Enter Email Address: "` Prompts the user to enter an email address. The `-n` option -n prevents the output from moving to a new line and is purely for cosmetic purposes.
1. `read my_email` Allows the user's input to be saved to the `my_email` variable.
1. `echo` Moves to a new line for cosmetic purposes.
1. `echo -n "Enter Password: "` Prompts the user to enter a password.
1. `read -s my_password` Allows the user's input to be saved to the `my_password` variable. The `-s` option stands for 'silent' and prevents the characters from being echoed back to the console.
1. `echo` Moves to a new line for cosmetic purposes.
1. `EMAIL=$my_email PASSWORD=$my_password npx playwright test tests/authenticate.spec.js` Runs the test with newly defined EMAIL and PASSWORD parameters.

This whole command can also be run in one line: `echo -n "Enter Email Address: " && read my_email && echo && echo -n "Enter Password: " && read -s my_password && echo && EMAIL=$my_email PASSWORD=$my_password npx playwright test tests/authenticate.spec.js`

For additional ways to pass credentials to Playwright tests, see the official documentation: [Parameterize tests](https://playwright.dev/docs/test-parameterize).
