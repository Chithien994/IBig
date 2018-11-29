/*
ChiThienTCN
Header Component
*/
import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';
import { AppRoutingModule } from '../../app-routing.module';
import { Route, Router } from '@angular/router';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends BaseComponent {

  constructor(
    private appComponent: AppComponent,
    public appRouting: AppRoutingModule,
    private router: Router
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
}
