/**
 * ChiThienTCN.
 * Topic Service.
 */
import { Injectable } from '@angular/core';

import { Topic } from '../../models/topic';

import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base/base.service';
import { AuthenticationService } from '../auth/authentication.service';
import { TOPICS_PATH } from '../../app/app-constants';


@Injectable()
export class TopicService extends BaseService {

  constructor(protected http: HttpClient, public auth: AuthenticationService) {
    super(http);
  }

  /**
   * Get the Topics list
   *
   * @param limit number
   * @param offset number
   * @returns Topic[] | any
   */
  getTopics(limit: number, offset: number) {
    return this.get(this.getPathLimitOffset(limit, offset), this.auth.httpHeaders);
  }

  /**
   * Get topic by id
   *
   * @param id number
   * @returns Topic | any
   */
  getTopicFromId(id: number) {
    return this.get(this.getPathAddId(id), this.auth.httpHeaders);
  }

  /**
   * Add a topic
   *
   * @param topic Topic
   * @returns Topic | any
   */
  addTopic(topic: Topic) {
    return this.post(TOPICS_PATH, topic, this.auth.httpHeaders);
  }

  /**
   * Update a topic
   *
   * @param topic Topic
   * @returns any
   */
  update(topic: Topic) {
    return this.patch(this.getPathAddId(topic.id), topic, this.auth.httpHeaders);
  }

  /**
   * Delete a topic
   *
   * @param id number
   * @returns any
   */
  onDelete(id: number) {
    return this.delete(this.getPathAddId(id), this.auth.httpHeaders);
  }

  /**
   * Append the path by Id
   *
   * @param id number
   * @returns url string
   */
  getPathAddId(id: number) {
    return `${TOPICS_PATH}${id}/`;
  }

  /**
   * Get path with limit and offset
   *
   * @param limit number
   * @param offset number
   * @returns string (`${API_PATH}?limit=${limit}&offset=${offset}`)
   */
  getPathLimitOffset(limit: number, offset: number): string {
    return `${TOPICS_PATH}?limit=${limit}&offset=${offset}`;
  }
}
