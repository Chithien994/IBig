/**
 * ChiThienTCN.
 * Topic Service.
 */
import { Injectable } from '@angular/core';

import { Topic } from '../../models/topic';

import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../core/base/services/base.service';
import { TOPICS_PATH } from '../../app-constants';


@Injectable()
export class TopicService extends BaseService {

  constructor(protected http: HttpClient) {
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
    return this.get(this.getUrlLimitOffset(TOPICS_PATH, limit, offset), this.httpHeaders);
  }

  /**
   * Get topic by id
   *
   * @param id number
   * @returns Topic | any
   */
  getTopicFromId(id: number) {
    return this.get(this.getUrlAddId(TOPICS_PATH, id), this.httpHeaders);
  }

  /**
   * Add a topic
   *
   * @param topic Topic
   * @returns Topic | any
   */
  addTopic(topic: Topic) {
    return this.post(this.getFullUrl(TOPICS_PATH), topic, this.httpHeaders);
  }

  /**
   * Update a topic
   *
   * @param topic Topic
   * @returns any
   */
  update(topic: Topic) {
    return this.patch(this.getUrlAddId(TOPICS_PATH, topic.id), topic, this.httpHeaders);
  }

  /**
   * Delete a topic
   *
   * @param id number
   * @returns any
   */
  onDelete(id: number) {
    return this.delete(this.getUrlAddId(TOPICS_PATH, id), this.httpHeaders);
  }
}
