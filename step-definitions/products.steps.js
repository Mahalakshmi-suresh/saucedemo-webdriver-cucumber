const { Given, When, Then } = require('@wdio/cucumber-framework');
const { expect } = require('@wdio/globals')

const LoginPage = require('../pageobjects/login.page');
const ProductsPage = require('../pageobjects/products.page');
const testData = require('../test-data/testData.json');

const productNameByKey = (productKey) => {
    const productName = testData.products.names[productKey];

    if (!productName) {
        throw new Error(`Product key not found in test data: ${productKey}`);
    }

    return productName;
};

Then(/^I should see all products displayed on products page$/, async () => {
    const expectedProducts = Object.values(testData.products.names);

    const actualProducts = await ProductsPage.getAllProductNames();
    await expect(actualProducts).toEqual(expectedProducts);
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

When(/^I add product "([^"]*)" to the cart$/, async (productKey) => {
    const productName = productNameByKey(productKey);
    await ProductsPage.addProductToCart(productName);
});

When(/^I navigate to the cart$/, async () => {
    await ProductsPage.navigateToCart();
});

Then(/^I should see product "([^"]*)" in the cart$/, async (productKey) => {
    const productName = productNameByKey(productKey);
    await expect(await ProductsPage.isProductInCart(productName)).toBe(true);
});

When(/^I remove product "([^"]*)" from the cart$/, async (productKey) => {
    const productName = productNameByKey(productKey);
    await ProductsPage.removeProductFromCart(productName);
});

Then(/^I should not see product "([^"]*)" in the cart$/, async (productKey) => {
    const productName = productNameByKey(productKey);
    await expect(await ProductsPage.isProductInCart(productName)).toBe(false);
});

Then(/^I should see the price key "([^"]*)" for product "([^"]*)" in the cart$/, async (priceKey, productKey) => {
    const expectedPrice = testData.products.prices[priceKey];
    const productName = productNameByKey(productKey);

    if (!expectedPrice) {
        throw new Error(`Price key not found in test data: ${priceKey}`);
    }

    const actualPrice = await ProductsPage.getProductPriceInCart(productName);
    await expect(actualPrice).toBe(expectedPrice);
});

Then(/^I should see the total price key "([^"]*)" in the cart$/, async (totalKey) => {
    const expectedTotal = testData.products.totals[totalKey];

    if (!expectedTotal) {
        throw new Error(`Total key not found in test data: ${totalKey}`);
    }

    const actualTotal = await ProductsPage.getTotalOfCartItems();
    await expect(actualTotal).toBe(expectedTotal);
});

Then(/^I should see the message "([^"]*)" in the cart$/, async (expectedMessage) => {
    const messageText = await ProductsPage.getEmptyCartMessage();
    await expect(messageText).toBe(expectedMessage);
});

Then(/^I should see the quantity "([^"]*)" for "([^"]*)" in the cart$/, async (expectedQuantity, productName) => {
    const actualQuantity = await ProductsPage.getQuantityForProductInCart(productName);
    await expect(actualQuantity).toBe(expectedQuantity);
});

When(/^I increase the quantity of "([^"]*)" to "([^"]*)" in the cart$/, async (productName, quantity) => {
    await ProductsPage.increaseProductQuantityInCart(productName, quantity);
});