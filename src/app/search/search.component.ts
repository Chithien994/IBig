import { Component, OnInit } from '@angular/core';

import { Observable, of, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Topic } from '../../models/topic';
import { TopicService } from '../../services/topic.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  topics$: Observable<Topic[]>;
  private searchedSubject = new Subject<string>();

  constructor(private topicService: TopicService,) { }

  search(searchedString: string): void {    
    console.log(`searchedString = ${searchedString}`);
    this.searchedSubject.next(searchedString);
  }

  ngOnInit() {
    this.topics$ = this.searchedSubject.pipe(
      debounceTime(300), // wait 300ms after each keystroke before considering the searched string
      distinctUntilChanged(),// ignore new string if same as previous string
      switchMap((searchedString: string) => this.topicService.searchTopics(searchedString))
    );
  }
}
