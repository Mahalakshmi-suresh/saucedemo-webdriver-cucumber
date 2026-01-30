Feature: Login Validation for SauceDemo

  Scenario: Login with valid credentials
    Given I am on the login page
    When I login with "standard_user" and "secret_sauce"
    Then I should be redirected to the products page

  Scenario: Login with invalid username and valid password
    Given I am on the login page
    When I login with "invalid_user" and "secret_sauce"
    Then I should see an error message "Epic sadface: Username and password do not match any user in this service"

  Scenario: Login with valid username and invalid password
    Given I am on the login page
    When I login with "standard_user" and "invalid_password"
    Then I should see an error message "Epic sadface: Username and password do not match any user in this service"

  Scenario: Login with empty username and password
    Given I am on the login page
    When I login with "" and ""
    Then I should see an error message "Epic sadface: Username is required"

  Scenario: Login with empty password
    Given I am on the login page
    When I login with "standard_user" and ""
    Then I should see an error message "Epic sadface: Password is required"
