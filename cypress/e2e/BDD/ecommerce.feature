Feature: End to end ecommerce validation
application regression

Scenario: Ecommerce products delivery 
Given I open ecommerce page
When I add items to cart 
And validate the total prices
Then select the country submit and verify Thankyou

Scenario: Filling the form to shop
Given I open Ecommerce page 
When I fill the form details 
|name | gender |
| bob | male |
Then validate the forms behaviour
And select the shop page
