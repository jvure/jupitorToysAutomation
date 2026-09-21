import { $ } from '@wdio/globals';
import Page from './page';

class ContactFormPage extends Page {

    public get foreName() {
        return $('#forename');
    }

    public get surname() {
        return $('#surname');
    }

    public get email() {
        return $('#email');
    }

    public get telephone() {
        return $('#telephone');
    }

    public get message() {
        return $('#message');
    }

    public get btnSubmit() {
        return $('a=Submit');
    }

     public get pageTitle() {
        return $('h1=Contact');
    }

    public get foreNameError() {
    return $('#forename-err');
   }

  public get emailError() {
    return $('#email-err');
   }

     public get messageError() {
    return $('#message-err');
   }

    public get alertError() {
    return $('div.alert.alert-error');
   }

    public get alertInfoDisplay() {
    return $('div.alert.alert-info');
   }
   

    public get alertSuccessDisplay() {
    return $('div.alert.alert-success');
   }
   
// This method fills in the mandatory fields of the contact form with the provided values for forename, email, and message.
    public async fillMandatoryFields(foreName: string,email: string,message: string) {
    await this.foreName.setValue(foreName);
    await this.email.setValue(email);
    await this.message.setValue(message);
}

   
    public async clickSubmit() {
        await this.btnSubmit.click();
    }

    public open() {
        return super.open('/#/contact');
    }
}

export default new ContactFormPage();
