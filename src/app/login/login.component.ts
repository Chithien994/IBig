import { Component } from '@angular/core';
import { BaseComponent } from '../common/base/base.component';
import { AuthenticationService } from 'src/services/auth/authentication.service';
import { RP_CODE, RP_MESSAGE, RP_ID } from '../app-constants';
import { Message, MessageService } from 'src/services/message/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent {

  login: object = {'username': '', 'password': ''};

  constructor(private auth: AuthenticationService, public msgServer: MessageService) {
    super();
    msgServer.clear();
  }

  onInit() {
  }

  onLogin(username: string, password: string): void {
    this.msgServer.clear();
    this.auth.login(username, password).subscribe(result => {
      console.log(JSON.stringify(result));
      if (result && result[RP_ID] > 0) {
        this.msgServer.onSuccess();
      } else {
        this.msgServer.setFailure(result[RP_MESSAGE]);
      }
    });
  }
}
