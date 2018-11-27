import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Observable, of, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { BaseService } from '../../services/base/base.service';
import { AuthenticationService } from '../../services/auth/authentication.service';
import { KEY_SEARCH, VAL_LIMIT_SEARCH, KEY_LIMIT } from '../app-constants';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  list$: Observable<any[]>;

  @Input() path: string
  @Input() title: string

  /** Initialize an event notifying parents */
  @Output() event = new EventEmitter<any>()
  

  constructor(private baseService: BaseService, private auth: AuthenticationService) { }

  search(searchedString: string): void {
    this.searchedSubject(searchedString).subscribe(result =>{
      if(result != null && typeof result['results'] != null){
        this.event.emit(result['results'])
      }
    })
  }

  ngOnInit() {
    
  }

  /**
   * GET topics whose name contains searched string
   * 
   * @param typedString string
   * @returns Array[] | any
   */
  searchedSubject(typedString: string): Observable<any>{
    if (!typedString.trim()) {     
      return of([]);
    }
    return this.baseService.get(
      `${this.path}?${KEY_LIMIT}=${VAL_LIMIT_SEARCH}&${KEY_SEARCH}=${typedString}`,
       this.auth.httpHeaders).pipe(
          debounceTime(300), // wait 300ms after each keystroke before considering the searched string
          distinctUntilChanged(),// ignore new string if same as previous string
        );
  }
}
