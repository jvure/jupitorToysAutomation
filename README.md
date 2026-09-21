# Jupiter Toys – UI Test Automation

## Project Overview

This project contains automated UI tests for the **Jupiter Toys** web application.

The automation framework is designed to validate key customer journeys including:

* Contact form validation
* Successful contact form submission
* Product purchase and shopping cart calculations

The project uses **WebdriverIO, Selenium, Cucumber and TypeScript** and follows a maintainable automation structure using Page Object Model principles.

---

## Technology Stack

| Technology         | Purpose                         |
| ------------------ | ------------------------------- |
| WebdriverIO        | UI test automation framework    |
| Selenium WebDriver | Browser automation              |
| Cucumber           | BDD feature files and scenarios |
| TypeScript         | Programming language            |
| Node.js            | Runtime environment             |
| Chai               | Assertions                      |
| Page Object Model  | Test maintainability            |
| Git / GitHub       | Source control                  |

---

## Automated Test Cases

### Test Case 1 – Contact Form Validation

**Objective:**
Verify that mandatory field validation works correctly on the Contact page.

**Steps:**

1. Navigate from the Home page to the Contact page.
2. Click the **Submit** button without entering any information.
3. Verify that the appropriate validation error messages are displayed.
4. Populate all mandatory fields.
5. Verify that the validation error messages are no longer displayed.

**Expected Result:**

* Mandatory field validation messages are displayed when required fields are empty.
* After entering valid mandatory information, the validation messages disappear.

---

### Test Case 2 – Successful Contact Form Submission

**Objective:**
Verify that a user can successfully submit the Contact form after providing all mandatory information.

**Steps:**

1. Navigate from the Home page to the Contact page.
2. Populate all mandatory fields.
3. Click the **Submit** button.
4. Verify that the successful submission confirmation message is displayed.

**Expected Result:**

The Contact form should be successfully submitted and the appropriate success message should be displayed.

**Additional Validation:**

This test is executed **5 times** to improve confidence in the stability and reliability of the automated test.

---

### Test Case 3 – Shopping Cart and Price Validation

**Objective:**
Verify product quantities, individual prices, subtotals and the overall cart total.

**Products purchased:**

| Teddyquantity | Frogquantity | Teddyprice | Frogprice|
| 0             | 2            |0          | 10.99     |
| 1             | 0            |  12.99    | 0         | 
**Note: I have designed the test case in a way where you can give quantity needed under each product and what is expected price. 
Automation code will pick the quantity, if it is >0 it would add the number of quantity products (eg: 3 bunny toys, 2 stuffies) to the cart.
Price of each product is validated against the expected rate, then subtotals for the quantities entered and totals are validated.**

**Steps:**

1. Purchase **2 Stuffed Frogs**.
2. Purchase **5 Fluffy Bunnies**.
3. Purchase **3 Valentine Bears**.
4. Navigate to the Shopping Cart.
5. Verify the price of each product.
6. Verify the subtotal for each product.
7. Verify that the cart total is equal to the sum of all product subtotals.

**Expected Result:**

* The correct quantity is displayed for each product.
* The individual product price is correct.
* Each product subtotal is calculated correctly.
* The overall cart total equals the sum of all product subtotals.

---

## Project Structure

The project follows a Page Object Model structure to separate test logic from page-specific functionality.

```text
jupiter-toys-automation/
│
├── features/
│   └── *.feature
│
├── step-definitions/
│   └── *.ts
│
├── pageobjects/
│   ├── home.page.ts
│   ├── contact.page.ts
│   └── cart.page.ts
│
├── test/
│   └── ...
│
├── wdio.conf.ts
├── package.json
├── package-lock.json
└── README.md
```

> The exact folder names may vary depending on the implementation in the repository.

---

# Installation and Setup

## Prerequisites

Make sure the following are installed:

* Node.js
* npm
* Git
* Visual Studio Code

Check Node.js:

```bash
node -v
```

Check npm:

```bash
npm -v
```

---

## Clone the Repository

Clone the repository using Git:

```bash
git clone <repository-url>
```

Navigate into the project:

```bash
cd <project-folder>
```

---

## Install Dependencies

Install the required Node.js packages:

```bash
npm install
```

This will install all dependencies defined in `package.json` and create the `node_modules` directory.

If the repository contains a `package-lock.json`, you can also use:

```bash
npm ci
```

---

# Running the Tests

## Run the Complete Test Suite

Run all automated tests using:

```bash
npx wdio run wdio.conf.ts
```

Depending on the scripts configured in `package.json`, the following may also be available:

```bash
npm test
```



# Test Execution

The automation suite validates the following end-to-end scenarios:

```text
Home Page
   │
   ├── Contact Page
   │      ├── Mandatory field validation
   │      └── Successful submission
   │
   └── Shop
          │
          └── Shopping Cart
                 ├── Product price validation
                 ├── Product subtotal validation
                 └── Total calculation validation
```

---

# Test Design

The automation framework follows **Page Object Model (POM)** principles.

Page-specific locators and actions are maintained separately from the test scenarios. This improves:

* Maintainability
* Reusability
* Readability
* Separation of concerns
* Ease of updating locators
* Scalability of the test framework

Cucumber feature files describe the expected behaviour in a readable BDD format, while the step definitions connect the scenarios to the automation implementation.

---

## Author- Jyothi Vure

**QA Automation Engineer**

This project demonstrates practical experience in
