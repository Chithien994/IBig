/*
ChiThienTCN
Topic - detail Component
*/
import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { Location } from '@angular/common';

import { Topic } from '../../models/topic';
import { User } from '../../models/user';

/** Router */
import { Router, ActivatedRoute } from '@angular/router';

/** Service */
import { TopicService } from '../../services/topic/topic.service';
import { MessageService } from '../../services/message/message.service';
import { R_TOPICS_PATH, R_DETAIL_PATH } from '../app-constants';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css']
})
export class TopicDetailComponent implements OnInit {

  /** Get data from parents */
  @Input() topic: Topic;

  /** Initialize an event notifying parents */
  @Output() messageEvent = new EventEmitter<boolean>();

  users: User[];
  user = new User;

  constructor(
    private route: ActivatedRoute,
    private topicService: TopicService,
    private location: Location,
    private msgService: MessageService,
    private router: Router
    ) { }

  ngOnInit() {

    // Automatically get data when component is initialized
    this.getUsers();
    this.getTopicFromID();
  }

  /**
   * Hide this Component
   */
  onHidden() {
    this.topic = null;
  }

  /**
   * Hide close button when in topic detail page (domain/detail/:id => return true)
   *
   * @returns true or false
   */
  hiddenCloseButton() {
    if (this.router.url.search(R_DETAIL_PATH) === 1) {
      return true;
    }
    return false;
  }

  /**
   * Get users
   */
  getUsers() {
    this.topicService.auth.getUsers().subscribe(results => {
      this.users = results['results'];
    });
  }

  /**
   * Get data by id
   */
  getTopicFromID(): void {

    // Clear message
    this.msgService.clear();

    // get id from param map
    const id = +this.route.snapshot.paramMap.get('id');
    if (id > 0) {
      this.topicService.getTopicFromId(id).subscribe(topic => this.topic = topic);
    }
  }

  /**
   * Update data
   * called from template
   *
   * @param name string
   * @param user number
   */
  onUpdate(name: string, user: number): void {
    this.msgService.clear();
    this.topicService.update(new Topic().getParams(this.topic.id, user, name)).subscribe(result => {

      console.log(`code: ${JSON.stringify(result)}`);
      if (result != null && result['status'] === 200 || result['code'] === 200 || result['id']) {

        //// Topic successfully updated.

        // Go back if you are on the details page.
        if (this.route.snapshot.paramMap.get('id')) {
          this.goBack();
        } else {

          // Reset data
          this.topic.name = name;
          this.topic.user = user;

          // Successful notification.
          this.msgService.onSuccess();
        }
      } else {

        // Notification failed
        this.msgService.setFailure(result['message']);
      }
    });
  }

  /**
   * Add a topic
   * called from template
   *
   * @param name string
   * @param user number
   */
  add(name: string, user: number): void {

    // Notify when user has too many topics.
    this.happy();

    this.msgService.clear();
    this.topicService.addTopic(new Topic().getParams(this.topic.id, user, name)).subscribe(result => {
      if (result != null && result['status'] === 200 || result['code'] === 200 || result['id']) {

        // Topic successfully added

        // Record the number of times the topic was successfully added
        sessionStorage.setItem('add', (`${+sessionStorage.getItem('add') + 1}`));

        //// Go back if you are on the details page.
        if (this.route.snapshot.paramMap.get('id')) {
          // this.goBack()
          window.location.href = R_TOPICS_PATH;
        } else {

          // Send request to parents to reload the data.
          this.messageEvent.emit(true);

          // Successful notification.
          this.msgService.onSuccess();
        }
      } else {

        // Notification failed
        this.msgService.setFailure(result['message']);
      }

    });

  }

  /**
   * Go back
   */
  goBack(): void {
    this.location.back();
  }

  /**
   * Notify when user has too many topics.
   */
  happy() {
    if (+sessionStorage.getItem('add') > 2) {
      alert('Có rãnh lắm không???');
      sessionStorage.setItem('add', '0');
    }
  }
}
