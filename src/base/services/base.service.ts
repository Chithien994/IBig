import { Injectable } from '@angular/core';

/** Get data asynchronously with Observable */
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { API_URL } from '../../app/app-constants';
import { BaseAuthService } from './base.auth.service';
import { StatusCode } from '../constants';
import { DialogService } from 'src/common/dialog/dialog.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService extends BaseAuthService {

  dialog: DialogService;
  constructor(protected http: HttpClient) {
    super();
  }

  /**
   * Post
   *
   * @param path string
   * @param body ?: any | null
   * @param options ?: any | null
   * @returns any
   */
  post(url: string, body?: any | null, options?: any | null): Observable<any> {
    return this.http.post<any>(url, body, options).pipe(
      tap(),
      catchError((error: HttpErrorResponse) => {
        this.throwError(error);
        return of(error);
      })
    );
  }

  /**
   * Get
   *
   * @param url string
   * @param options ?: any | null
   * @returns any
   */
  get(url: string, options?: any | null): Observable<any> {
    return this.http.get<any>(url, options).pipe(
      tap(),
      catchError((error: HttpErrorResponse) => {
        this.throwError(error);
        return throwError(error);
      })
    );
  }

  /**
   * Put
   *
   * @param url string
   * @param body ?: any | null
   * @param options ?: any | null
   * @returns any
   */
  put(url: string, body?: any | null, options?: any | null): Observable<any> {
    return this.http.put<any>(url, body, options).pipe(
      tap(),
      catchError((error: HttpErrorResponse) => {
        this.throwError(error);
        return of(error);
      })
    );
  }

  /**
   * Patch
   *
   * @param url string
   * @param body ?: any | null
   * @param options ?: any | null
   * @returns any
   */
  patch(url: string, body?: any | null, options?: any | null): Observable<any> {
    return this.http.patch<any>(url, body, options).pipe(
      tap(),
      catchError((error: HttpErrorResponse) => {
        this.throwError(error);
        return of(error);
      })
    );
  }

  /**
   * Delete
   *
   * @param url string
   * @param options ?: any | null
   * @returns any
   */
  delete(url: string, options?: any | null): Observable<any> {
    return this.http.delete<any>(url, options).pipe(
      tap(),
      catchError((error: HttpErrorResponse) => {
        this.throwError(error);
        return of(error);
      })
    );
  }

  /**
   * Get the full url.
   *
   * @param path string
   * @return string url
   */
  getFullUrl(path: string) {
    return API_URL + path;
  }

  /**
   * Append the url by Id
   *
   * @param path string
   * @param id number
   * @returns url string
   */
  getUrlAddId(path: string, id: number) {
    return `${API_URL}${path}${id}/`;
  }

  /**
   * Get url with limit and offset
   *
   * @param path string
   * @param limit number
   * @param offset number
   * @returns string (`${path}?limit=${limit}&offset=${offset}`)
   */
  getUrlLimitOffset(path: string, limit: number, offset: number) {
    return `${API_URL}${path}?limit=${limit}&offset=${offset}`;
  }

  /**
   * Basic error handling:
   * Unauthorized,
   * Forbidden,
   * Has been blocked by CORS policy: Response to preflight request doesn't pass access control
   *
   * @param error HttpErrorResponse
   */
  throwError(error: HttpErrorResponse) {

    if (!error) { return; }
    switch (error.status) {
      case StatusCode._0:
        this.requestRefreshAndTryAgain();
        break;
      case StatusCode._401:
        this.unAuthorized();
        break;
      case StatusCode._403:
        // alert('You do not have permission to perform this action.');
        break;
    }
  }
  /**
   * Request page refresh and try again
   */
  requestRefreshAndTryAgain() {
    alert('Please refresh the page and try again!');
  }

   /**
   * Get the message from HttpErrorResponse object.
   *
   * @param HttpErrorResponse error the HttpErrorResponse object.
   * @return string the message.
   */
  getErrorMessage(error) {
    if (error.error.detail) {

      return error.error.detail;
    } else if (error.message) {

      return error.message;
    } else if (error.statusText) {

      return `Errer: ${error.statusText}`;
    }
    return 'An unknown error occurred: ' + error.status;
  }
}
