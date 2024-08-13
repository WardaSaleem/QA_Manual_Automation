Feature: Purchase Item as an Unregistered User on Amazon


Scenario: Add TP-Link N450 WiFi Router to Cart
	Given I navigate to the Amazon website as unregistered user
	When  I search for "TP-Link N450 WiFi Router - Wireless Internet Router for Home(TL-WR940N)"
	And   I add the relevant item to the cart
	Then  I should see the relevant item in the cart
	And   I should see the correct amount for the relevant item in the cart