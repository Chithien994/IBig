import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CURRENT_USER, LOGIN_HTTP_OPTIONS } from '../../app/app-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService {
  readonly LOGIN_PATH = 'login';
  readonly LOGOUT_PATH = 'logout';

  constructor(protected http: HttpClient) { 
    super(http);
  }

  public fakeHttpHeaders = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'token d95ca4f94ea324af1622757882c583f85e5b9a27'
    })
  };

  public httpHeaders = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `token ${this.currentToken()}`
    })
  };

  login(username:string, password:string){
    const body = new URLSearchParams();
    body.set("username",username);
    body.set("password",password);
    return this.post(this.LOGIN_PATH, body, LOGIN_HTTP_OPTIONS);
  }

    /**
   * This method is used to logout.
   */
  logout() {
    // remove user from local storage to log user out
    return this.post(this.LOGOUT_PATH).pipe(result => result);
  }

  /**
   * Returns true if the app is logging.
   */
  isLogined() {
    return sessionStorage.getItem(CURRENT_USER) != null;
  }

  /**
   * Get current login user.
   * @param user object
   */
  setCurrentUser(user) {
    sessionStorage.setItem(CURRENT_USER, JSON.stringify(user));
  }

  /**
   * Get current user info.
   */
  currentUser() {
    return JSON.parse(sessionStorage.getItem(CURRENT_USER));
  }

  clearSession() {
    sessionStorage.removeItem(CURRENT_USER);
  }

  /**
   * Get current name of current user.
   */
  currentName() {
    const user = this.currentUser();
    if (user!=null && user.name != null) {
      return user.name;
    }
    return "";
  }

  currentToken(){
    const user = this.currentUser();
    if (user!=null && user.token != null) {
      return user.token;
    }
    return "";
  }
}
