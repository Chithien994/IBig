import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Observable, of, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap, count
} from 'rxjs/operators';

import { BaseService } from '../../../services/base/base.service';
import { AuthenticationService } from '../../../services/auth/authentication.service';
import { KEY_SEARCH, VAL_LIMIT_SEARCH, KEY_LIMIT } from '../../app-constants';

/**
 * @description
 * Add this component to any location on the template (html),
 * to use the search function.
 * You can customize the interface with 2 class (title-search, input-search).
 *
 * @param path: string
 * @param title: string
 *
 * @callback event EventEmitter<any>()
 *
 * @example
 * <app-search
 *    (event)="onSearch($event)"
 *    [title]="'Example'"
 *    [path]="'example/'">
 * </app-search>
 *
 * Add to template
 */
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  @Input() path: string;
  @Input() title: string;

  /** Initialize an event notifying parents */
  @Output() event = new EventEmitter<any>();


  constructor(private baseService: BaseService, private auth: AuthenticationService) { }

  ngOnInit() {}

  /**
   * Used to ui, key word transmission
   *
   * @param searchedString string
   */
  search(searchedString: string): void {

    if (searchedString) {
      this.searchedSubject(searchedString).subscribe(result => {
        if (result != null && typeof result['results'] != null) {
          this.event.emit(result['results']);
        }
      });
    } else {

      this.event.emit(false);
    }
  }

  /**
   * GET topics whose name contains searched string
   *
   * @param typedString string
   * @returns Array[] | any
   */
  searchedSubject(typedString: string): Observable<any> {

    // Example: pathexample?limit=25&search=example
    const path = `${this.path}?${KEY_LIMIT}=${VAL_LIMIT_SEARCH}&${KEY_SEARCH}=${typedString}`;
    return this.baseService.get(
      path,
      this.auth.httpHeaders).pipe(
        debounceTime(300), // wait 300ms after each keystroke before considering the searched string
        distinctUntilChanged(), // ignore new string if same as previous string
      );
  }
}
