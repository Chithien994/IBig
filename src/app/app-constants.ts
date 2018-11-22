import {HttpHeaders} from '@angular/common/http';
export const URL = 'https://itbigger.pythonanywhere.com/';
export const API_URL = `${URL}api/v1/`;
export const LOGIN_HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type':  'application/x-www-form-urlencoded'
  })
};
/**
 * Config the time to show warning timeout popup.
 * @type {{idle: number; timeout: number; ping: number}}
 */
export const TIMEOUT_CONFIG = {idle: 1800, timeout: 31, ping: 5};
export const MessageType = {success: 'success', info: 'info', warning: 'warning', danger: 'danger'};
// Routing path
export const HOME = '';
export const LOGIN_PATH = 'login/';
export const TOPICS_PATH = `topics/`;
export const USERS_PATH = `users/`;

export const APP_NAME = 'IBig';
export const CURRENT_USER = 'currentUser';
export const LOGGED_IN_AS = 'You are logged in as ';
export const SEPARATOR = ' | ';
export const LOGOUT = 'Log Out';
export const HELP = 'Help';
export const ROLE_EDIT_SUFFIX = '-EDIT';
export const ROLE_VIEW_SUFFIX = '-VIEW';
export const WITHOUT_CHECK_ROLE_MODULES = [HOME, 'master'];