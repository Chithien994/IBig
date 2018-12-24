/*
ChiThienTCN
Header Component
*/
import { Component } from '@angular/core';
import { AppComponent } from '../../app/app.component';
import { AppRoutingModule } from '../../app/app-routing.module';
import { Route, Router } from '@angular/router';
import { BaseComponent } from '../../base/component/base.component';
import { MessageService } from 'src/services/message/message.service';
import { AuthenticationService } from 'src/services/auth/authentication.service';
import { R_SIGNUP_PATH, R_LOGIN_PATH } from 'src/app/app-constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends BaseComponent {

  /** Register path */
  registerPath = R_SIGNUP_PATH;

  /** Login path */
  loginPath = R_LOGIN_PATH;

  constructor(
    private appComponent: AppComponent,
    public appRouting: AppRoutingModule,
    private router: Router,
    private msgServer: MessageService,
    public auth: AuthenticationService
    ) {
    super();
  }

  currentRouter: Route;

  onInit() {}

  /**
   * Get app title
   *
   * @returns title
   */
  getAppTitle(): string {
    return this.appComponent.title;
  }

  /**
   * Set current router
   *
   * @returns only true
   */
  setCurrentRouter(): boolean {
    for (const route of this.appRouting.routes) {
      if (route.path === this.getPath().split('/')[1] ||
      this.getPath().search(route.path.substring(0, 7)) === 1) {// ==> 'detail/'
        this.currentRouter = route;
        break;
      } else {
        this.currentRouter = {path: '', data: {title: '', isShow: false}};
      }
    }
    return true;
  }

  /**
   * Get current router
   *
   * @returns Route
   */
  getCurrentRouter(): Route {
    return this.currentRouter;
  }

  /**
   * Get home router
   *
   * @returns Route
   */
  getHomeRouter(): Route {
    return this.appRouting.routes[0];
  }

  /**
   * Get current path
   *
   * @returns path
   *
   * @example
   * http://localhost:4200/detail/15
   * return '/detail/15'
   */
  getPath(): string {
    return this.router.url;
  }

  /**
   * Clear all message
   */
  clearMsg(): void {
    this.msgServer.clear();
  }
}
