const { $ } = require('@wdio/globals')
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class ProductsPage extends Page {
	get cartLink() {
		return $('.shopping_cart_link');
	}

	get cartItems() {
		return $$('.cart_item');
	}

	get cartBadge() {
		return $('.shopping_cart_badge');
	}

	get productNameElements() {
		return $$('.inventory_item_name');
	}

	_slugifyProductName(productName) {
		return productName.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
	}

	_inventoryItemByName(productName) {
		return $(`//div[contains(@class,"inventory_item")][.//div[contains(@class,"inventory_item_name") and normalize-space()="${productName}"]]`);
	}

	_cartItemByName(productName) {
		return $(`//div[contains(@class,"cart_item")][.//div[contains(@class,"inventory_item_name") and normalize-space()="${productName}"]]`);
	}

	_addButtonByProductName(productName) {
		const productSlug = this._slugifyProductName(productName);
		return $(`#add-to-cart-${productSlug}`);
	}

	_removeButtonByProductName(productName) {
		const productSlug = this._slugifyProductName(productName);
		return $(`#remove-${productSlug}`);
	}

	async addProductToCart(productName) {
		const addButton = await this._addButtonByProductName(productName);
		if (await addButton.isExisting()) {
			await addButton.click();
			return;
		}

		const removeButton = await this._removeButtonByProductName(productName);
		if (await removeButton.isExisting()) {
			return;
		}

		const inventoryItem = await this._inventoryItemByName(productName);
		const fallbackAddButton = await inventoryItem.$('button=Add to cart');
		await fallbackAddButton.click();
	}

	async getAllProductNames() {
		const nameElements = await this.productNameElements;
		const productNames = [];

		for (const element of nameElements) {
			productNames.push(await element.getText());
		}

		return productNames;
	}

	async navigateToCart() {
		await this.cartLink.click();
	}

	async removeProductFromCart(productName) {
		const removeButton = await this._removeButtonByProductName(productName);
		if (await removeButton.isExisting()) {
			await removeButton.click();
			return;
		}

		const cartItem = await this._cartItemByName(productName);
		if (!await cartItem.isExisting()) {
			return;
		}
		const fallbackRemoveButton = await cartItem.$('button=Remove');
		await fallbackRemoveButton.click();
	}

	async isProductInCart(productName) {
		const cartItem = await this._cartItemByName(productName);
		return cartItem.isExisting();
	}

	async getProductPriceInCart(productName) {
		const cartItem = await this._cartItemByName(productName);
		const price = await cartItem.$('.inventory_item_price');
		return price.getText();
	}

	async getTotalOfCartItems() {
		const priceElements = await $$('.cart_item .inventory_item_price');
		let total = 0;

		for (const priceElement of priceElements) {
			const priceText = await priceElement.getText();
			total += Number(priceText.replace('$', ''));
		}

		return `$${total.toFixed(2)}`;
	}

	async getQuantityForProductInCart(productName) {
		const cartItem = await this._cartItemByName(productName);
		const quantityElement = await cartItem.$('.cart_quantity');
		return quantityElement.getText();
	}

	async getEmptyCartMessage() {
		const message = await $('.cart_empty_message');
		if (await message.isExisting()) {
			return message.getText();
		}

		return '';
	}

	async increaseProductQuantityInCart(productName, quantity) {
		const cartItem = await this._cartItemByName(productName);
		const quantityInput = await cartItem.$('input[type="number"], select');

		if (!await quantityInput.isExisting()) {
			throw new Error(`Quantity update is not supported in the cart UI for product: ${productName}`);
		}

		await quantityInput.setValue(quantity);
	}
}

module.exports = new ProductsPage();