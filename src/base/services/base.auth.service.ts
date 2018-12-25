import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

export const CURRENT_USER = 'currentUser';
@Injectable({
  providedIn: 'root'
})

export class BaseAuthService {

  readonly LOGIN_PATH = 'login';
  constructor() {
  }

  unAuthorized() {
    this.clearSession();
    window.location.href = `/${this.LOGIN_PATH}`;
  }

  /**
   * Returns true if the app is logging.
   */
  protected isLogined() {
    return localStorage.getItem(CURRENT_USER) != null;
  }

  /**
   * set current login user.
   *
   * @param user object
   */
  protected setCurrentUser(user) {
    localStorage.setItem(CURRENT_USER, JSON.stringify(user));
  }

  /**
   * Get current user info.
   */
  protected currentUser() {
    return JSON.parse(localStorage.getItem(CURRENT_USER));
  }

  /**
   * This method is used to clear session.
   */
  protected clearSession() {
    localStorage.removeItem(CURRENT_USER);
  }

  /**
   * Get current name of current user.
   *
   *  @returns name -- string
   */
  protected currentName(): string {
    const user = this.currentUser();
    if (user != null && user.name != null) {
      return user.name;
    }
    return '';
  }

  /**
   * Get current first name of current user.
   *
   *  @returns first name -- string
   */
  protected currentFirstName(): string {
    const user = this.currentUser();
    if (user && user.first_name) {
      return user.first_name;
    }
    return '';
  }

  /**
   * Get current last name of current user.
   *
   *  @returns last name -- string
   */
  protected currentLastName(): string {
    const user = this.currentUser();
    if (user && user.last_name) {
      return user.last_name;
    }
    return '';
  }

    /**
   * Get current full name of current user.
   *
   *  @returns full name -- string
   */
  protected currentFullName(): string {
    const user = this.currentUser();
    if (user && user.first_name && user.last_name) {
      return `${user.first_name} ${user.last_name}`;
    }
    return '';
  }

  /**
   * Get current token of current user.
   *
   * @returns token -- string
   */
  protected currentToken(): string {
    const user = this.currentUser();
    if (user != null && user.token != null) {
      return user.token;
    }
    return '';
  }
}
