import { Injectable } from '@angular/core';

/** Get data asynchronously with Observable */
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { API_URL } from '../../app/app-constants';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(protected http: HttpClient) {
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
      catchError(error => of(error))
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
      catchError(error => of(error))
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
      catchError(error => of(error))
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
      catchError(error => of(error))
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
      tap(response => {
        console.log(JSON.stringify(response));
      }),
      catchError(error => of(error))
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
   * Get the message from HttpErrorResponse object.
   *
   * @param HttpErrorResponse error the HttpErrorResponse object.
   * @return string the message.
   */
  getErrorMessage(error: HttpErrorResponse) {
    if (error.error != null) {
      return error.message;
    }
    return 'An unknown error occurred: ' + error.status;
  }
}
