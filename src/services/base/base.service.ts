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
  post(path: string, body?: any | null, options?: any | null): Observable<any> {
    return this.http.post<any>(this.getFullUrl(path), body, options).pipe(
      tap(),
      catchError(error => of(error))
    );
  }

  /**
   * Get
   * 
   * @param path string
   * @param options ?: any | null
   * @returns any
   */
  get(path: string, options?: any | null): Observable<any> {
    return this.http.get<any>(this.getFullUrl(path), options).pipe(
      tap(),
      catchError(error => of(error))
    );
  }

  /**
   * Put
   * 
   * @param path string
   * @param body ?: any | null
   * @param options ?: any | null
   * @returns any
   */
  put(path: string, body?: any | null, options?: any | null): Observable<any> {
    return this.http.put<any>(this.getFullUrl(path), body, options).pipe(
      tap(),
      catchError(error => of(error))
    );
  }

  /**
   * Patch
   * 
   * @param path string
   * @param body ?: any | null
   * @param options ?: any | null
   * @returns any
   */
  patch(path: string, body?: any | null, options?: any | null): Observable<any> {
    return this.http.patch<any>(this.getFullUrl(path), body, options).pipe(
      tap(),
      catchError(error => of(error))
    );
  }

  /**
   * Delete
   * 
   * @param path string
   * @param options ?: any | null
   * @returns any
   */
  delete(path: string, options?: any | null): Observable<any> {
    console.log(this.getFullUrl(path))
    return this.http.delete<any>(this.getFullUrl(path), options).pipe(
      tap(response =>{
        console.log(JSON.stringify(response))
      }),
      catchError(error => of(error))
    );
  }

  /**
   * Get the full url.
   * @param path string
   * @return {string} url
   */
  getFullUrl(path: string) {
    return API_URL + path;
  }

   /**
   * Get the message from HttpErrorResponse object.
   * @param {HttpErrorResponse} error the HttpErrorResponse object.
   * @return {string} the message.
   */
  getErrorMessage(error: HttpErrorResponse) {
    if (error.error != null) {
      return error.message;
    }
    return 'An unknown error occurred: ' + error.status;
}
}
