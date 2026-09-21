
Feature: Shopping and checkout

  Scenario Outline: Verify product prices, subtotals and cart total

    Given I am on the Jupiter Toys home page 
    When I clicked on start shopping button
    When I buy toys from the display page Stuffed Frog <Frogquantity> and Fluffy Bunny <Bunnyquantity> and Valentine Bear <VBearquantity> and Teddy Bear <Teddyquantity> and Handmade Doll <Dollquantity> and Smiley Bear <Bearquantity> and Funny Cow <Cowquantity> and Smiley Face <Smileyquantity>
    And I go to the cart page 
    Then I should see the correct price and subtotal for each product Stuffed Frog <Frogprice> and Fluffy Bunny <Bunnyprice> and Valentine Bear <VBearprice> and Teddy Bear <Teddyprice> and Handmade Doll <Dollprice> and Smiley Bear <Bearprice> and Funny Cow <Cowprice> and Smiley Face <Smileyprice>
   And The cart total should equal the sum of the product subtotals

 Examples:
      | Teddyquantity | Frogquantity | Dollquantity |Bunnyquantity |Bearquantity |Cowquantity |VBearquantity |Smileyquantity | Teddyprice | Frogprice | Dollprice | Bunnyprice | Bearprice | Cowprice | VBearprice | Smileyprice |
      | 0             | 2            | 0            | 5            | 0           |  0          | 3            | 0             | 0          | 10.99     | 0         |   9.99     |       0   |     0    |     14.99   |     0   |
      | 1             | 0           | 0            | 0            | 0           |  0          | 0            | 0             | 12.99      | 0         | 0         |   0         |       0   |     0    |     0       |     0   |

  
