const { Then } = require('@wdio/cucumber-framework');
const { expect, $ } = require('@wdio/globals')

const ProductsPage = require('../pageobjects/products.page');
const testData = require('../test-data/testData.json');

const productNameByKey = (productKey) => {
    const productName = testData.products.names[productKey];

    if (!productName) {
        throw new Error(`Product key not found in test data: ${productKey}`);
    }

    return productName;
};

Then(/^I should be redirected to the products page$/, async () => {
    await browser.waitUntil(async () => (await browser.getUrl()).includes('inventory.html'), {
        timeout: 5000,
        timeoutMsg: 'Expected to be redirected to the products page'
    });

    const productsTitle = await $(".title");
    await expect(productsTitle).toBeExisting();
    await expect(productsTitle).toHaveText('Products');
});

Then(/^I should see an error message key "([^"]*)"$/, async (messageKey) => {
    const expectedMessage = testData.login.messages[messageKey];

    if (!expectedMessage) {
        throw new Error(`Error message key not found in test data: ${messageKey}`);
    }

    const errorDiv = await $('[data-test="error"]');
    await expect(errorDiv).toBeExisting();
    await expect(errorDiv).toHaveText(expectedMessage);
});

Then(/^I should see all products displayed on products page$/, async () => {
    const expectedProducts = Object.values(testData.products.names);

    const actualProducts = await ProductsPage.getAllProductNames();
    await expect(actualProducts).toEqual(expectedProducts);
});

Then(/^I should see product "([^"]*)" in the cart$/, async (productKey) => {
    const productName = productNameByKey(productKey);
    await expect(await ProductsPage.isProductInCart(productName)).toBe(true);
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
