import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CURRENT_USER, TYPE_HTTP_OPTIONS, SIGNUP_PATH, SMS_VERIFICATION } from '../../app/app-constants';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService {
  readonly LOGIN_PATH = 'login';
  readonly LOGOUT_PATH = 'logout';
  readonly USERS_PATH = `users/`;

  constructor(protected http: HttpClient) {
    super(http);
  }

  /**
   * Option: HttpHeaders ---
   * Content-Type,
   * Authorization
   */
  public httpHeaders = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `token ${this.currentToken()}`
    })
    // headers: new HttpHeaders({
    //   'Content-Type':  'application/json',
    //   'Authorization': 'token d95ca4f94ea324af1622757882c583f85e5b9a27'
    // })
  };

  /**
   * This method is used to get the users a list
   *
   * @returns any | User[]
   */
  getUsers() {
    return this.get(this.USERS_PATH, this.httpHeaders);
  }

  /**
   * This method is used to login.
   *
   * @param username string
   * @param password string
   * @returns any | User object
   */
  login(username: string, password: string) {
    const body = new Object();
    body['username'] = username;
    body['password'] = password;
    return this.post(this.getFullUrl(this.LOGIN_PATH), body, TYPE_HTTP_OPTIONS);
  }

  register(object: Object) {
    return this.post(this.getFullUrl(SIGNUP_PATH), object, TYPE_HTTP_OPTIONS);
  }

  verify(countryCode: string, phoneNumber: string) {
    const body = new Object();
    body['phone_number'] = phoneNumber;
    body['verify_code'] = countryCode;
    return this.post(this.getFullUrl(SMS_VERIFICATION), body, TYPE_HTTP_OPTIONS);
  }

  /**
   * This method is used to logout.
   *
   * @returns any | User object
   */
  logout() {

    // remove user from local storage to log user out
    return this.post(this.LOGOUT_PATH).pipe(result => result);
  }

  /**
   * Returns true if the app is logging.
   */
  isLogined() {
    return localStorage.getItem(CURRENT_USER) != null;
  }

  /**
   * set current login user.
   *
   * @param user object
   */
  setCurrentUser(user) {
    localStorage.setItem(CURRENT_USER, JSON.stringify(user));

    // Reload page
    window.location.reload();
  }

  /**
   * Get current user info.
   */
  currentUser() {
    return JSON.parse(localStorage.getItem(CURRENT_USER));
  }

  /**
   * This method is used to clear session.
   */
  clearSession() {
    localStorage.removeItem(CURRENT_USER);
    window.location.href = '';
  }

  /**
   * Get current name of current user.
   *
   *  @returns name -- string
   */
  currentName(): string {
    const user = this.currentUser();
    if (user != null && user.name != null) {
      return user.name;
    }
    return '';
  }

  /**
   * Get current token of current user.
   *
   * @returns token -- string
   */
  currentToken(): string {
    const user = this.currentUser();
    if (user != null && user.token != null) {
      return user.token;
    }
    return '';
  }
}
