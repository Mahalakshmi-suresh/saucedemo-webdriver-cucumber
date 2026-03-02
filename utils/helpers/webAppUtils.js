class WebAppUtils {
    async openUrl(url) {
        await browser.url(url);
    }

    async getCurrentUrl() {
        return browser.getUrl();
    }

    async waitForUrlContains(expectedPath, timeout = 5000) {
        await browser.waitUntil(async () => (await browser.getUrl()).includes(expectedPath), {
            timeout,
            timeoutMsg: `Expected URL to contain: ${expectedPath}`
        });
    }

    async refreshPage() {
        await browser.refresh();
    }
}

module.exports = new WebAppUtils();
