/*
ChiThienTCN
Topic Service
*/
import { Injectable } from '@angular/core';

import { Topic } from '../models/topic';
//MessageService
import { MessageService } from './message.service';

//Get data asynchronously with Observable
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'token d95ca4f94ea324af1622757882c583f85e5b9a27'
  })
};

const topicUrl = 'https://itbigger.pythonanywhere.com/api/v1/topics/';

@Injectable()
export class TopicService {
  public message = "";

  getTopics(): Observable<Topic[]> {
    // this.messageService.add(`${ new Date().toLocaleString()}. Get movie list`);
    // return of(fakeTopics);
    return this.http.get<Topic[]>(topicUrl, httpOptions).pipe(
      tap(receivedTopics => console.log(`receivedTopics = ${JSON.stringify(receivedTopics)}`)),
      catchError(error => of([]))
    );
  }
  getTopicFromId(id: number): Observable<Topic> {
    this.message = "";
    const topicIdUrl = `${topicUrl}${id}/`;
    return this.http.get<Topic>(topicIdUrl, httpOptions).pipe(
      tap(topic => console.log(`topic = ${JSON.stringify(topic)}`)),
      catchError(error => of(error))
    );
  }

  update(topic: Topic): Observable<any> {
    this.message = "";
    const topicIdUrl = `${topicUrl}${topic.id}/`;
    return this.http.patch<Topic>(topicIdUrl, topic, httpOptions).pipe(
      tap(topic => {
        console.log(`topic = ${JSON.stringify(topic)}`)
        this.message = "Successed!";
      }),
      catchError(error => of(error))
    );
  }

  /* GET topics whose name contains searched string */
  searchTopics(typedString: string): Observable<Topic[]> {
    if (!typedString.trim()) {     
      return of([]);
    }
    return this.http.get<Topic[]>(`${topicUrl}?name_like=${typedString}`).pipe(
      tap(foundedTopics => console.log(`founded movies = ${JSON.stringify(foundedTopics)}`)),
      catchError(error => of(null))
    );
  }

  constructor(
    private http: HttpClient,
    public messageService: MessageService) { }
}
