import {HttpHeaders} from '@angular/common/http';
export const URL = 'https://itbigger.pythonanywhere.com/';
export const API_URL = `${URL}api/v1/`;
export const LOGIN_HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
/**
 * Config the time to show warning timeout popup.
 *
 * type {idle: number; timeout: number; ping: number}
 */
export const TIMEOUT_CONFIG = {idle: 1800, timeout: 31, ping: 5};
export const MessageType = {success: 'success', info: 'info', warning: 'warning', danger: 'danger'};

// Routing path
export const R_HOME = '';
export const R_LOGIN_PATH = 'login';
export const R_REGISTER_PATH = 'register';
export const R_TOPICS_PATH = `topics`;
export const R_BASHBOARD_PATH = `dashboard`;
export const R_DETAIL_PATH = `detail/`;
export const R_USERS_PATH = `users`;

// Api path
export const LOGIN_PATH = 'login/';
export const TOPICS_PATH = `topics/`;
export const USERS_PATH = `users/`;

// Api key
export const KEY_SEARCH = `search`;
export const KEY_LIMIT = `limit`;
export const KEY_OFFSET = `offset`;

// Api value
export const VAL_LIMIT_SEARCH = 25;

// Response
export const RP_ID = 'id';
export const RP_RESULTS = 'results';
export const RP_COUNT = 'count';
export const RP_CODE = 'code';
export const RP_STATUS = 'status';
export const RP_MESSAGE = 'message';

export const APP_NAME = 'IBig';
export const CURRENT_USER = 'currentUser';
export const LOGGED_IN_AS = 'You are logged in as ';
export const SEPARATOR = ' | ';
export const LOGOUT = 'Log Out';
export const HELP = 'Help';
export const ROLE_EDIT_SUFFIX = '-EDIT';
export const ROLE_VIEW_SUFFIX = '-VIEW';
export const WITHOUT_CHECK_ROLE_MODULES = [R_HOME, 'master'];
