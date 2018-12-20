import { Component, Input } from '@angular/core';
import { BaseComponent } from '../common/base/base.component';
import { AuthenticationService } from 'src/services/auth/authentication.service';
import { Message } from 'src/services/message/message.service';
import { RP_ID, R_HOME, RP_MESSAGE, RP_CODE } from '../app-constants';

/**
 * @description
 * Add this component to item location on the template (html),
 * to use the verify function.
 * You can customize the interface with class.
 *
 * @param title: string -- default title = 'Verify'
 * @param phone: string
 *
 * @callback event EventEmitter<any>()
 *
 * @example
 * <app-delete-modal
 *    [title]="'Verify phone number'"
 *    [phone]="0866xxxxxx">
 * </app-delete-modal>
 *
 * Add to template
 */
@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent extends BaseComponent {

  @Input() title = 'Verify';
  @Input() phone: string;

  /** Verify model (Used for template-driven forms) */
  verify: object = {};

  /** Message variable. */
  message: Message;

  /** Show icon is in progress, and disable "Verify" button, if "loading" is true. False in reverse. */
  loading: boolean;

  /** Show icon is in progress, and disable "Message not received" button, if "resend" is true. False in reverse. */
  resend: boolean;

  constructor(private auth: AuthenticationService) {
    super();
  }

  onInit() {
    this.loading = false;
    this.resend = false;
  }

  /**
   * This method is used to verify phone number
   *
   * @param countryCode string
   */
  onVerify(countryCode: string) {

    this.message = new Message;
    this.loading = true;
    this.auth.verify(countryCode, this.phone).subscribe(result => {

      this.loading = false;
      if (result && result[RP_ID] > 0) {

        // Set the message content (Success).
        this.message.setNotfy('Successed!', false);

        // Saves sign up session with all content returned.
        this.auth.setCurrentUser(result);
      } else {

        // Set message content (Failed).
        this.message.setNotfy(result[RP_MESSAGE], true);
      }
    });
  }

  /**
   * This method is used to resend verification sms.
   */
  onResend() {

    this.message = new Message;
    this.resend = true;
    this.auth.resendSms(this.phone).subscribe(result => {

      this.resend = false;
      if (result && result[RP_CODE] === 200) {

        // Set the message content (Success).
        this.message.setNotfy(result[RP_MESSAGE], false);
      } else {

        // Set message content (Failed).
        this.message.setNotfy(result[RP_MESSAGE], true);
      }
    });
  }
}
