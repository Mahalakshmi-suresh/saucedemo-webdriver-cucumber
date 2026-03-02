Feature: Product And Cart Validation

    Background:
        Given I login with valid credentials

    Scenario: Verify all products are displayed after successful login
        Then I should see all products displayed on products page

    Scenario: Add multiple products and validate the cart
        When I add product "backpack" to the cart
        And I add product "bikeLight" to the cart
        And I navigate to the cart
        Then I should see product "backpack" in the cart
        And I should see product "bikeLight" in the cart

    Scenario: Remove product from the cart and validate
        When I add product "backpack" to the cart
        And I add product "bikeLight" to the cart
        And I navigate to the cart
        And I remove product "backpack" from the cart
        Then I should not see product "backpack" in the cart

    Scenario: Validate product details in the cart
        When I add product "backpack" to the cart
        And I navigate to the cart
        Then I should see product "backpack" in the cart
        And I should see the price key "backpack" for product "backpack" in the cart

    Scenario: Validate cart total price
        When I add product "backpack" to the cart
        And I add product "bikeLight" to the cart
        And I navigate to the cart
        Then I should see the total price key "backpackAndBikeLight" in the cart


