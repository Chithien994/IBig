import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

export const VERIFY_INFO = 'verify_info';
export const CURRENT_USER = 'currentUser';
@Injectable({
  providedIn: 'root'
})

export class BaseAuthService {

  readonly LOGIN_PATH = 'login';
  constructor() {
  }

 /**
   * @description
   * Option: HttpHeaders ---
   * Content-Type,
   * Authorization
   */
  public httpHeaders = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `token ${this.currentToken()}`
    })
  };

  /**
   * @description
   * Unauthorized access to the system (Session login error).
   */
  public unAuthorized() {
    this.clearSession();
    window.location.href = `/${this.LOGIN_PATH}`;
  }

  /**
   * @description
   * Returns true if the app is logging.
   */
  public isLogined() {
    return localStorage.getItem(CURRENT_USER) != null;
  }

  /**
   * @description
   * This method is used to set current login user.
   * And information to verify.
   *
   * @param user object
   */
  public setCurrentUser(user) {
    localStorage.setItem(CURRENT_USER, JSON.stringify(user));
    this.setIsVerify(null);
  }

  /**
   * @description
   * Get current user info.
   */
  public currentUser() {
    return JSON.parse(localStorage.getItem(CURRENT_USER));
  }

  /**
   * @description
   * This method is used to clear session.
   * And information to verify.
   */
  public clearSession() {
    localStorage.removeItem(CURRENT_USER);
    this.setIsVerify(null);
  }

  /**
   * @description
   * Get current id of current user.
   *
   *  @returns id -- string
   */
  public currentId(): number {
    const user = this.currentUser();
    if (user != null && user.id != null) {
      return +user.id;
    }
    return 0;
  }

  /**
   * @description
   * Get current name of current user.
   *
   *  @returns name -- string
   */
  public currentName(): string {
    const user = this.currentUser();
    if (user != null && user.name != null) {
      return user.name;
    }
    return '';
  }

  /**
   * @description
   * Get current first name of current user.
   *
   *  @returns first name -- string
   */
  public currentFirstName(): string {
    const user = this.currentUser();
    if (user && user.first_name) {
      return user.first_name;
    }
    return '';
  }

  /**
   * @description
   * Get current last name of current user.
   *
   *  @returns last name -- string
   */
  public currentLastName(): string {
    const user = this.currentUser();
    if (user && user.last_name) {
      return user.last_name;
    }
    return '';
  }

  /**
   * @description
   * Get current full name of current user.
   *
   *  @returns full name -- string
   */
  public currentFullName(): string {
    const user = this.currentUser();
    if (user && user.first_name && user.last_name) {
      return `${user.first_name} ${user.last_name}`;
    }
    return '';
  }

  /**
   * @description
   * Get current token of current user.
   *
   * @returns token -- string
   */
  public currentToken(): string {
    const user = this.currentUser();
    if (user != null && user.token != null) {
      return user.token;
    }
    return '';
  }

  /**
   * @description
   * Return information to verify (phone number).
   *
   * @returns string
   */
  public isVerify() {
    return sessionStorage.getItem(VERIFY_INFO);
  }

  /**
   * @description
   * Save or delete information to verify (phone number).
   * With param equal null, it will delete information to verify
   *
   * @param phone string
   */
  public setIsVerify(phone: string) {
    if (phone) {
      sessionStorage.setItem(VERIFY_INFO, phone);
    } else {
      sessionStorage.removeItem(VERIFY_INFO);
    }
  }
}
