import { Component } from '@angular/core';
import { BaseComponent } from '../common/base/base.component';
import { AuthenticationService } from 'src/services/auth/authentication.service';
import { RP_MESSAGE, RP_ID } from '../app-constants';
import { Message } from 'src/services/message/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent {

  // Login model (Used for template-driven forms)
  login: object = {'username': '', 'password': ''};

  // Message variable.
  message: Message;

  // Loading
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
