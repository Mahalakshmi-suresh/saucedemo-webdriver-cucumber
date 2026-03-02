const { Given } = require('@wdio/cucumber-framework');

const LoginPage = require('../pageobjects/login.page');
const testData = require('../test-data/testData.json');

Given(/^I am on the login page$/, async () => {
    await LoginPage.open();
});

Given(/^I login with valid credentials$/, async () => {
    const credentials = testData.login.credentialSets.valid;

    await LoginPage.open();
    await LoginPage.login(credentials.username, credentials.password);
    await browser.waitUntil(async () => (await browser.getUrl()).includes('inventory.html'), {
        timeout: 5000,
        timeoutMsg: 'Expected to be redirected to inventory after login'
    });
});
