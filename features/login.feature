Feature: Login Validation for SauceDemo

  Scenario: Login with valid credentials
    Given I am on the login page
    When I login with credential set "valid"
    Then I should be redirected to the products page

  Scenario: Login with invalid username and valid password
    Given I am on the login page
    When I login with credential set "invalidUsername"
    Then I should see an error message key "invalidCredentials"

  Scenario: Login with valid username and invalid password
    Given I am on the login page
    When I login with credential set "invalidPassword"
    Then I should see an error message key "invalidCredentials"

  Scenario: Login with empty username and password
    Given I am on the login page
    When I login with credential set "emptyUsernameAndPassword"
    Then I should see an error message key "usernameRequired"

  Scenario: Login with empty password
    Given I am on the login page
    When I login with credential set "emptyPassword"
    Then I should see an error message key "passwordRequired"
