/*
ChiThienTCN
Topic Service
*/
import { Injectable } from '@angular/core';

import { Topic } from '../models/topic';

//Get data asynchronously with Observable
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base/base.service';
import { AuthenticationService } from '../services/auth/authentication.service';
import { TOPICS_PATH } from '../app/app-constants';


@Injectable()
export class TopicService extends BaseService {
  public message = "";

  constructor(protected http: HttpClient, private auth: AuthenticationService) {
    super(http);
  }

  getTopics() {
    // this.messageService.add(`${ new Date().toLocaleString()}. Get movie list`);
    // return of(fakeTopics);
    return this.get(TOPICS_PATH, this.auth.fakeHttpHeaders);
  }
  getTopicFromId(id: number) {
    this.message = "";
    return this.get(this.getPathAddId(id), this.auth.fakeHttpHeaders);
  }

  update(topic: Topic) {
    this.message = "";
    return this.patch(this.getPathAddId(topic.id), topic, this.auth.fakeHttpHeaders);
  }

  /* GET topics whose name contains searched string */
  searchTopics(typedString: string) {
    if (!typedString.trim()) {     
      return of([]);
    }
    return this.get(`${TOPICS_PATH}?name_like=${typedString}`, this.auth.fakeHttpHeaders);
  }

  getPathAddId(id: number){
    return `${TOPICS_PATH}${id}/`;
  }
}
