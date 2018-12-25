/*
ChiThienTCN
Header Component
*/
import { Component } from '@angular/core';
import { AppComponent } from '../../app/app.component';
import { AppRoutingModule } from '../../app/app-routing.module';
import { Route, Router, RouterState } from '@angular/router';
import { BaseComponent } from '../../base/component/base.component';
import { MessageService } from 'src/services/message/message.service';
import { AuthenticationService } from 'src/services/auth/authentication.service';
import { R_SIGNUP_PATH, R_LOGIN_PATH } from 'src/app/app-constants';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { pipe } from '@angular/core/src/render3';

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

  path = '';

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
   * Set current router
   *
   * @returns only true
   */
  setCurrentRouter(): boolean {
    if (this.path !== this.getPath()) {
      this.currentRouter = this.appRouting.routes.find(
        route => (route.path.split('/:')[0] === this.getPath().split('/')[1]));
        console.log('sss');
        this.path = this.getPath();
    }
    return true;
  }

  /**
   * Get current router
   *
   * @returns Route
   */
  getCurrentRouter() {
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
