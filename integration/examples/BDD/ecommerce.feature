Feature: End to end ecommerce validation.
application testing.
Scenario: Products delivery
Given I open ecommerce page
When I add items to cart 
And validate the total prices.
Then Select the country submit and verify thank you alert.

Scenario: Filling form to shop
Given  I open ecommerce page
When  I fill in the form details
Then  Validate the form behaviours
And select the shop page
   