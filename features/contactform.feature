
Feature: Contact form and submission

  Scenario Outline: Validating mandatory fields upon submission in contact form

    Given I am on the Jupiter Toys home page
    When I navigate to the Contact page
    And I click the Submit button
    Then I should see error messages for the mandatory fields
    When I populate all mandatory fields with "<forename>" and "<email>" and "<message>"
    Then The error messages should no longer be displayed

    Examples:
      | forename | email                | message                 |
      | John     | john.doe@example.com | This is a test message  |


  Scenario Outline: Filling contact form with mandatory fields and submitting successfully

    Given I am on the Jupiter Toys home page
    When I navigate to the Contact page
    And I populate all mandatory fields with "<forename>" and "<email>" and "<message>"
    And I click the Submit button
    Then I should see the successful submission message

    Examples:
      | forename | email                   | message                         |
      | John     | john.doe@example.com    | This is a test message          |
      | Jyothi   | jyothi.vure@example.com | This is automation space        |
      | Elsa     | elsa.vure@example.com   | This is frozen world            |
      | Ana      | ana.vure@example.com    | This is Ana-frozen world    |
      | Thor     | thor.vure@example.com   | This is Thor -the dark world   |

