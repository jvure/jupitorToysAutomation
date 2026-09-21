
import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals'

import ContactForm  from '../pages/contactform.page';
import HomePage from '../pages/home.page';



Given(/^I am on the Jupiter Toys home page$/, async () => {
    await HomePage.openHomePage();  
});


When(/^I navigate to the Contact page$/, async () => {
    await ContactForm.open();
 
});

When(/^I click the Submit button$/, async () => {
    await ContactForm.clickSubmit();
    await browser.pause(2000); // Pause for 2 seconds to allow error messages to appear
});


Then(/^I should see error messages for the mandatory fields$/, async () => {

     await expect(ContactForm.foreNameError).toBeDisplayed();
     await expect(ContactForm.emailError).toBeDisplayed();
     await expect(ContactForm.messageError).toBeDisplayed();
     await expect(ContactForm.alertError).toBeDisplayed();
     await browser.pause(2000);
}); 


When('I populate all mandatory fields with {string} and {string} and {string}', async (forename: string, email: string, message: string) => {
    console.log('Filling in mandatory fields...');
     console.log('forename =', forename);
        console.log('email    =', email);
        console.log('message  =', message);
    await ContactForm.fillMandatoryFields(forename,  email, message);
    await browser.pause(2000); // Pause for 2 seconds to allow error messages to appear
   
    // await ContactForm.clickSubmit();
    // await browser.pause(2000); 
});

Then(/^The error messages should no longer be displayed$/, async () => {

     await expect(ContactForm.foreNameError).not.toBeDisplayed();
     await expect(ContactForm.emailError).not.toBeDisplayed();
     await expect(ContactForm.messageError).not.toBeDisplayed();
     await expect(ContactForm.alertError).not.toBeDisplayed();
       await expect(ContactForm.alertInfoDisplay).toBeDisplayed();
     await browser.pause(2000);
}); 


Then('I should see the successful submission message', async () => {

    await ContactForm.alertSuccessDisplay.waitForDisplayed({
        timeout: 20000,
        timeoutMsg: 'Expected successful submission message to be displayed'
    });

    await expect(ContactForm.alertSuccessDisplay).toBeDisplayed();
});


