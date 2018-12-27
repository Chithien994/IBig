/*
ChiThienTCN
Topic - detail Component
*/
import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { BaseComponent } from '../../base/component/base.component';
import { Topic } from '../../models/topic';
import { User } from '../../models/user';

/** Service */
import { TopicService } from '../../services/topic/topic.service';
import { MessageService } from '../../services/message/message.service';

/** Constants */
import { R_TOPICS_PATH, R_DETAIL_PATH, RP_RESULTS, RP_CODE, RP_STATUS, RP_ID, RP_MESSAGE } from '../app-constants';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-add-detail',
  templateUrl: './topic-add.component.html',
  styleUrls: ['./topic-add.component.css']
})
export class TopicAddComponent extends BaseComponent {

  /** data */
  topic: Topic;

  /** Initialize an event notifying parents */
  @Output() messageEvent = new EventEmitter<boolean>();

  users: User[];
  user = new User;

  /** Show icon is in progress, and disable "Upload" button, if "uploading" is true. False in reverse. */
  uploading: boolean;

  /** Show icon is in progress, and disable "New" button, if "adding" is true. False in reverse. */
  adding: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private topicService: TopicService,
    private msgService: MessageService
    ) {
    super();
  }

  onInit() {

    this.uploading = false;
    this.adding = false;

    // Automatically get data when component is initialized
    this.getUsers();
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
    if (this.getPath().search(R_DETAIL_PATH) === 1) {
      return true;
    }
    return false;
  }

  /**
   * Get users
   */
  getUsers() {
    this.topicService.auth.getUsers().subscribe(results => {
      console.log(`User: ${results}`);
      this.users = results[RP_RESULTS];
    });
  }

  /**
   * Get data by id
   */
  getTopicFromID(): void {

    // Clear message
    this.msgService.clear();

    // get id from param map
    const id = +this.paramMap().get('id');
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
    this.uploading = true;
    this.msgService.clear();
    this.topicService.update(new Topic().getParams(this.topic.id, user, name)).subscribe(result => {

      this.uploading = false;
      if (result != null && result[RP_STATUS] === 200 || result[RP_CODE] === 200 || result[RP_ID]) {

        // Topic successfully updated.

        // Go back if you are on the details page.
        if (this.paramMap().get('id')) {
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
        this.msgService.setFailure(this.topicService.getErrorMessage(result));
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
    this.adding = true;
    // Notify when user has too many topics.
    this.happy();

    this.msgService.clear();
    this.topicService.addTopic(new Topic().getParams(this.topic.id, user, name)).subscribe(result => {

      this.adding = false;
      if (result != null && result[RP_STATUS] === 200 || result[RP_CODE] === 200 || result[RP_ID]) {

        // Topic successfully added

        // Record the number of times the topic was successfully added
        localStorage.setItem('add', (`${+localStorage.getItem('add') + 1}`));

        // Go to topic page if you are on the details page.
        if (this.paramMap().get('id')) {
          this.goToPage(R_TOPICS_PATH);
        } else {

          // Send request to parents to reload the data.
          this.messageEvent.emit(true);

          // Successful notification.
          this.msgService.onSuccess();
        }
      } else {

        // Notification failed
        this.msgService.setFailure(this.topicService.getErrorMessage(result));
      }

    });

  }

  /**
   * @description
   * Param map
   *
   * ActivatedRoute Contains the information about a route associated with a component loaded in an outlet.
   *
   * snapshot The current snapshot of this route
   *
   * @returns this.activatedRoute.snapshot.paramMap: ParamMap
   */
  paramMap(): ParamMap {
    return this.activatedRoute.snapshot.paramMap;
  }

  /**
   * Notify when user has too many topics.
   */
  happy() {
    if (+localStorage.getItem('add') > 2) {
      alert('Có rãnh lắm không???');
      localStorage.setItem('add', '0');
    }
  }
}
