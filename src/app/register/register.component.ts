import { Component } from '@angular/core';
import { BaseComponent } from '../core/base/components/base.component';
import { RP_MESSAGE, PATH_COUNTRY_CODE, RP_CODE, R_LOGIN_PATH } from '../app-constants';
import { Message } from 'src/app/services/message/message.service';
import { CountryCode } from '../models/country.code';
import { User } from 'src/app/models/user';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ValidatorsForms } from 'src/app/core/shared/ValidatorsForms';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends BaseComponent {

  /** Login Path */
  loginPath = R_LOGIN_PATH;

  /** Register model (Used for template-driven forms) */
  register: object = {};

  /** Country codes list */
  countryCodes: CountryCode;

  /** Message variable. */
  message: Message;

  /** Show icon is in progress, and disable "Sign up" button, if "loading" is true. False in reverse. */
  loading: boolean;

  userFormGroup: FormGroup;

  constructor(public usersService: UsersService) {
    super();
  }

  onInit() {
    this.loading = false;
    this.getCountryCode();

    // Get User FormGroup (ValidatorsForms)
    // this.userFormGroup = ValidatorsForms.userFormGroup(this.formBuilder);
  }

  /**
   * This method is used to sign up.
   *
   * @param firstName string
   * @param lastName string
   * @param email string
   * @param countryCode string
   * @param phoneNumber string
   * @param password string
   */
  onRegister(firstName: string,
    lastName: string,
    email: string,
    countryCode: string,
    phoneNumber: string,
    password: string): void {

    this.loading = true;

    // Initialization of message model.
    this.message  = new Message;

    // Sign up and wait for the result to return.
    this.usersService.register(new User()
    .setParams(firstName, lastName, email, countryCode, phoneNumber, password)).subscribe(result => {
      console.log(JSON.stringify(result));
      this.loading = false;
      if (result && result[RP_CODE] === 200) {

        // Set the message content (Success).
        this.message.setNotfy(result[RP_MESSAGE], false);
        this.usersService.setIsVerify(phoneNumber);
      } else {

        // Set message content (Failed).
        this.message.setNotfy(this.usersService.getErrorMessage(result), true);
      }
    });
  }

  /**
   * This method is used to get country code.
   */
  getCountryCode() {
    this.usersService.get(PATH_COUNTRY_CODE).subscribe(result => {
      this.countryCodes = result;
    });
  }
}
