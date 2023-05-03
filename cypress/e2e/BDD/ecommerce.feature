Feature: End to end ecommerce validation
application regression

Scenario: Ecommerce products delivery 
Given I open ecommerce page
When I add items to cart 
And validate the total prices
Then select the country submit and verify Thankyou