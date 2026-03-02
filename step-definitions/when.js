const { When } = require('@wdio/cucumber-framework');

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

When(/^I login with credential set "([^"]*)"$/, async (credentialSetKey) => {
    const credentials = testData.login.credentialSets[credentialSetKey];

    if (!credentials) {
        throw new Error(`Credential set not found in test data: ${credentialSetKey}`);
    }

    await LoginPage.login(credentials.username, credentials.password);
});

When(/^I add product "([^"]*)" to the cart$/, async (productKey) => {
    const productName = productNameByKey(productKey);
    await ProductsPage.addProductToCart(productName);
});

When(/^I navigate to the cart$/, async () => {
    await ProductsPage.navigateToCart();
});

When(/^I remove product "([^"]*)" from the cart$/, async (productKey) => {
    const productName = productNameByKey(productKey);
    await ProductsPage.removeProductFromCart(productName);
});
