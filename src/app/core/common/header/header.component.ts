/*
ChiThienTCN
Header Component
*/
import { Component } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { AppRoutingModule } from '../../../app-routing.module';
import { Route, Router, RouterState } from '@angular/router';
import { BaseComponent } from '../../base/components/base.component';
import { MessageService } from 'src/app/services/message/message.service';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
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

  historyPath = '';

  routerState: RouterState;

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

  onInit() {
    this.routerState = this.router.routerState;
  }

  /**
   * Get app title
   *
   * @returns title
   */
  getAppTitle(): string {
    return this.appComponent.title;
  }

  /**
   * Get current router
   *
   * @returns Route
   */
  getCurrentRouter() {
    if (this.historyPath !== this.getPath()) {
      this.currentRouter = this.appRouting.routes.find(
        route => (route.path.search(this.getPath().split('/')[1]) === 0));
        this.historyPath = this.getPath();
    }
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

  accessAbility(route: Route) {
    if (this.auth.isLogined()) {
      return (route.data.isShow && route.data.auth);
    }

    return (route.data.isShow && !route.data.auth);
  }

  /**
   * Clear all message
   */
  clearMsg(): void {
    this.msgServer.clear();
  }
}
