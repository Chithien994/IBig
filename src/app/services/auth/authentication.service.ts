import { Injectable } from '@angular/core';
import { BaseService } from '../../core/base/services/base.service';
import { HttpClient } from '@angular/common/http';
import { R_HOME_PATH, R_LOGIN_PATH, R_SIGNUP_PATH } from '../../app-constants';
import { ActivatedRoute, Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService {
  readonly LOGOUT_PATH = 'logout';
  readonly USERS_PATH = `users/`;

  constructor(
    protected http: HttpClient,
    private activatedRoute: ActivatedRoute) {
    super(http);
  }

  /**
   * Returns true if the app is logging.
   *
   * @method override
   */
  isLogined() {
    return super.isLogined();
  }

  /**
   * When accessing pages that require you to login,
   * but you have not logged in, it will automatically redirect to the login page.
   */
  checkLogined() {
    if (!this.isLogined()) {
      window.location.href = R_LOGIN_PATH;
    }
  }

  /**
   * set current login user.
   *
   * @method override
   * @param user object
   */
  setCurrentUser(user) {
    super.setCurrentUser(user);
    if (this.queryParams().returnUrl) {

      window.location.href = this.queryParams().returnUrl;
    } else if (window.location.pathname === `/${R_SIGNUP_PATH}` || window.location.pathname === `/${R_LOGIN_PATH}`) {

      // Go to home page, when this page is sign up page
      window.location.href = R_HOME_PATH;
    } else {

      // reload page
      window.location.reload();
    }
  }

  /**
   * Get current user info.
   *
   * @method override
   */
  currentUser() {
    return super.currentUser();
  }

  /**
   * This method is used to clear session.
   *
   * @method override
   */
  clearSession() {
    super.clearSession();

    // Reload page
    window.location.reload();
  }

  /**
   * Get current name of current user.
   *
   * @method override
   * @returns name -- string
   */
  currentName(): string {
    return super.currentName();
  }

  /**
   * Get current first name of current user.
   *
   *  @returns first name -- string
   */
  currentFirstName(): string {
    return super.currentFirstName();
  }

  /**
   * Get current last name of current user.
   *
   *  @returns last name -- string
   */
  currentLastName(): string {
    return super.currentLastName();
  }

    /**
   * Get current full name of current user.
   *
   *  @returns full name -- string
   */
  currentFullName(): string {
    return super.currentFullName();
  }

  /**
   * Get current token of current user.
   *
   * @method override
   * @returns token -- string
   */
  currentToken(): string {
    return super.currentToken();
  }

  /**
   * @description
   * Query Params
   *
   * ActivatedRoute Contains the information about a route associated with a component loaded in an outlet.
   *
   * snapshot The current snapshot of this route
   *
   * @returns this.activatedRoute.snapshot.queryParams: Params
   */
  queryParams(): Params {
    return this.activatedRoute.snapshot.queryParams;
  }
}
