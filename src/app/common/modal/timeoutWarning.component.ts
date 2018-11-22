import {Component} from '@angular/core';
import {AuthenticationService} from '../../../services/auth/authentication.service';
import {LOGIN_PATH, TIMEOUT_CONFIG} from '../../app-constants';
import {Router} from '@angular/router';
import {UserIdleService} from 'angular-user-idle';

declare var $: any;

@Component({
  selector: 'app-timeout-warning',
  templateUrl: './timeoutWarning.component.html'
})
export class TimeoutWarningComponent {
  title = 'Timeout';
  firstRowFlavorText = 'Due to inactivity you will soon be logged out.';
  secondRowFlavorText = 'Would you like to remain logged into the application?';
  isShowing = false;
  timeoutCountdown = 0;

  constructor(private authenticationService: AuthenticationService,
              private router: Router, private userIdle: UserIdleService) {
  }

  yesClicked() {
    this.userIdle.resetTimer();
    // this.authenticationService.status();
    $('#timeoutWarningModal').modal('hide');
    this.isShowing = false;
  }

  logoutClicked() {
    this.userIdle.resetTimer();
    this.userIdle.stopWatching();
    this.userIdle.stopTimer();
    this.authenticationService.logout().subscribe(res => {
      this.navigateLogin();
    }, error => {
      this.navigateLogin();
    });
    $('#timeoutWarningModal').modal('hide');
    this.isShowing = false;
  }

  navigateLogin() {
    this.authenticationService.clearSession();
    this.router.navigate([LOGIN_PATH]);
  }

  show() {
    if (!this.isShowing) {
      this.isShowing = true;
      $('#timeoutWarningModal').modal({show: true, backdrop: 'static'});
    }
  }

  hide() {
    this.logoutClicked();
  }

  setTimeoutCountdown(countDown) {
    if (countDown != null) {
      this.timeoutCountdown = countDown;
    }
  }
  countdownView(){
    return TIMEOUT_CONFIG.timeout - this.timeoutCountdown;
  }
}
