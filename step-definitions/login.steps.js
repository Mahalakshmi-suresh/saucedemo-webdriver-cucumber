const { Given, When, Then } = require('@wdio/cucumber-framework');
const { expect, $ } = require('@wdio/globals')

const LoginPage = require('../pageobjects/login.page');
const HomePage = require('../pageobjects/home.page');

const pages = {
    login: LoginPage,
    home: HomePage
}


Given(/^I am on the login page$/, async () => {
    await LoginPage.open();
});

When(/^I login with "([^"]*)" and "([^"]*)"$/, async (username, password) => {
    await LoginPage.login(username, password);
});

Then(/^I should be redirected to the products page$/, async () => {
    // SauceDemo redirects to /inventory.html after successful login
    await browser.waitUntil(async () => (await browser.getUrl()).includes('inventory.html'), {
        timeout: 5000,
        timeoutMsg: 'Expected to be redirected to the products page'
    });
    // Optionally, check for a products page element
    const productsTitle = await $(".title");
    await expect(productsTitle).toBeExisting();
    await expect(productsTitle).toHaveText('Products');
});

Then(/^I should see an error message "([^"]*)"$/, async (expectedMessage) => {
    // Error message appears in a div with data-test="error"
    const errorDiv = await $('[data-test="error"]');
    await expect(errorDiv).toBeExisting();
    await expect(errorDiv).toHaveText(expectedMessage);
});

