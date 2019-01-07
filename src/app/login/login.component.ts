import { Component } from '@angular/core';
import { BaseComponent } from '../core/base/components/base.component';
import { RP_ID, R_SIGNUP_PATH } from '../app-constants';
import { Message } from 'src/app/services/message/message.service';
import { UsersService } from 'src/app/services/users/users.service';

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

  constructor(private usersService: UsersService) {
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
    this.usersService.login(username, password).subscribe(result => {

      this.loading = false;
      if (result && result[RP_ID] > 0) {

        // Set the message content (Success).
        this.message.setNotfy('Successed!', false);

        // Saves login session with all content returned.
        this.usersService.setCurrentUser(result);
      } else {

        // Set message content (Failed).
        this.message.setNotfy(this.usersService.getErrorMessage(result), true);
      }
    });
  }
}
