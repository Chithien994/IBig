import { Component } from '@angular/core';
import { BaseComponent } from '../common/base/base.component';
import { AuthenticationService } from 'src/services/auth/authentication.service';
import { RP_MESSAGE, RP_ID, PATH_COUNTRY_CODE, RP_CODE, R_HOME } from '../app-constants';
import { Message } from 'src/services/message/message.service';
import { CountryCode } from '../../models/country.code';
import { User } from 'src/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends BaseComponent {

  // Register model (Used for template-driven forms)
  register: object = {};

  countryCodes: CountryCode;

  /** Message variable. */
  message: Message;

  /** Show icon is in progress, and disable "Sign up" button, if "loading" is true. False in reverse. */
  loading: boolean;

  /** Show icon is in progress, and disable "Verify code" button, if "verifying" is true. False in reverse. */
  verifying: boolean;

  /** Show disable Verify from, if "showFromVerify" is true. False in reverse. */
  showFromVerify: boolean;

  phone: string;

  constructor(private auth: AuthenticationService) {
    super();
  }

  onInit() {
    this.loading = false;
    this.showFromVerify = false;
    this.verifying = false;
    this.getCountryCode();
  }

  onRegister(firstName: string,
    lastName: string,
    email: string,
    countryCode: string,
    phoneNumber: string,
    password: string): void {

    this.loading = true;
    this.showFromVerify = false;

    // Initialization of message model.
    this.message  = new Message;

    // Sign up and wait for the result to return.
    this.auth.register(new User()
    .getParams(firstName, lastName, email, countryCode, phoneNumber, password)).subscribe(result => {
      console.log(JSON.stringify(result));
      this.loading = false;
      if (!result && result[RP_CODE] === 200) {

        // Show verify from
        this.showFromVerify = true;
        this.phone = phoneNumber;
      } else {

        // Set message content (Failed).
        this.message.setNotfy(result[RP_MESSAGE], true);
      }
    });
  }

  onVerify(countryCode: string) {

    this.verifying = true;
    this.auth.verify(countryCode, this.phone).subscribe(result => {

      this.verifying = false;
      if (result && result[RP_ID] > 0) {

        // Set the message content (Success).
        this.message.setNotfy('Successed!', false);

        // Saves login session with all content returned.
        this.auth.setCurrentUser(result);
        this.goToPage(R_HOME);
      } else {

        // Set message content (Failed).
        this.message.setNotfy(result[RP_MESSAGE], true);
      }
    });
  }

  getCountryCode() {
    this.auth.get(PATH_COUNTRY_CODE).subscribe(result => {
      this.countryCodes = result;
    });
  }
}
