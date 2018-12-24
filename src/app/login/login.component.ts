import { Component } from '@angular/core';
import { BaseComponent } from '../../base/component/base.component';
import { AuthenticationService } from 'src/services/auth/authentication.service';
import { RP_MESSAGE, RP_ID, R_SIGNUP_PATH } from '../app-constants';
import { Message } from 'src/services/message/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent {

  /** Register path */
  registerPath = R_SIGNUP_PATH;

  /** Login model (Used for template-driven forms) */
  login: object = {};

  /** Message variable. */
  message: Message;

  /** Show icon is in progress, and disable "Sign in" button, if "loading" is true. False in reverse. */
  loading: boolean;

  constructor(private auth: AuthenticationService) {
    super();
  }

  onInit() {
    this.loading = false;
  }

  /**
   * Used to login
   *
   * @param username string
   * @param password string
   */
  onLogin(username: string, password: string): void {

    this.loading = true;

    // Initialization of message model.
    this.message  = new Message;

    // Sign in and wait for the result to return.
    this.auth.login(username, password).subscribe(result => {

      this.loading = false;
      if (result && result[RP_ID] > 0) {

        // Set the message content (Success).
        this.message.setNotfy('Successed!', false);

        // Saves login session with all content returned.
        this.auth.setCurrentUser(result);
      } else {

        // Set message content (Failed).
        this.message.setNotfy(result[RP_MESSAGE], true);
      }
    });
  }
}
