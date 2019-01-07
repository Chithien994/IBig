import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { USERS_PATH, CHANGE_EMAIL_PATH, CHANGE_PHONE_PATH, TYPE_HTTP_OPTIONS,
  SIGNUP_PATH, VERIFY_SIGNIN_PATH, VERIFY_RESEND_SMS_PATH } from 'src/app/app-constants';
import { AuthenticationService } from '../auth/authentication.service';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends AuthenticationService {

  constructor(http: HttpClient, activatedRoute: ActivatedRoute) {
    super(http, activatedRoute);
  }

  /**
   * This method is used to get the users a list
   *
   * @returns any | User[]
   */
  getUsers() {
    return this.get(this.getFullUrl(this.USERS_PATH), this.httpHeaders);
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

  /**
   * This method is used to sign up.
   *
   * @param object JSONObject
   * @returns any | object
   */
  register(object: Object) {
    return this.post(this.getFullUrl(SIGNUP_PATH), object, TYPE_HTTP_OPTIONS);
  }

  /**
   * This method is used to verify.
   *
   * @param countryCode string
   * @param phoneNumber string
   * @returns any | User object
   */
  verify(verifyCode: string, phoneNumber: string) {
    const body = new Object();
    body['phone_number'] = phoneNumber;
    body['verify_code'] = verifyCode;
    return this.post(this.getFullUrl(VERIFY_SIGNIN_PATH), body, TYPE_HTTP_OPTIONS);
  }

  /**
   * This method is used to resend verification sms.
   *
   * @param phoneNumber string
   * @returns any | object
   */
  resendSms(phoneNumber: string) {
    const body = new Object();
    body['phone_number'] = phoneNumber;
    return this.post(this.getFullUrl(VERIFY_RESEND_SMS_PATH), body, TYPE_HTTP_OPTIONS);
  }

  /**
   * Get current user info
   *
   * @returns any || user
   */
  public getProfile() {
    return this.get(this.getUrlAddId(USERS_PATH, this.currentId()), this.httpHeaders);
  }

  /**
   * Update profile
   *
   * @returns any || user
   */
  public updateProfile(obj) {
    return this.patch(this.getUrlAddId(USERS_PATH, this.currentId()), obj, this.httpHeaders);
  }

  /**
   * Update email
   *
   * @param email string
   * @returns any || object
   */
  public updateEmail(email: string) {
    const body = new Object();
    body['email'] = email;
    return this.put(this.getFullUrl(CHANGE_EMAIL_PATH), body, this.httpHeaders);
  }

  /**
   * Update phone
   *
   * @param phoneNumber string
   * @param countryCode string
   * @returns any || object
   */
  public updatePhone(phoneNumber: string, countryCode: string) {
    const body = new Object();
    body['phone_number'] = phoneNumber;
    body['country_code'] = countryCode;
    return this.put(this.getFullUrl(CHANGE_PHONE_PATH), body, this.httpHeaders);
  }

  /**
   * Verify change phone
   *
   * @param phoneNumber string
   * @param verifyCode string
   * @returns any || object
   */
  public verifyChangePhone(phoneNumber: string, verifyCode: string) {
    const body = new Object();
    body['phone_number'] = phoneNumber;
    body['verify_code'] = verifyCode;
    return this.post(this.getFullUrl(CHANGE_PHONE_PATH), body, this.httpHeaders);
  }
}
