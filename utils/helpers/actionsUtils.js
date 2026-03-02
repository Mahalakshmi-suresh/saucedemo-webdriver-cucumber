class ActionsUtils {
    async clickElement(element) {
        await element.waitForDisplayed({ timeout: 5000 });
        await element.click();
    }

    async setInputValue(element, value) {
        await element.waitForDisplayed({ timeout: 5000 });
        await element.setValue(value);
    }

    async getElementText(element) {
        await element.waitForDisplayed({ timeout: 5000 });
        return element.getText();
    }

    async isElementDisplayed(element) {
        return element.isDisplayed();
    }
}

module.exports = new ActionsUtils();
