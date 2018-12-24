/*
ChiThienTCN
Topics Component
*/
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ChangeEvent, VirtualScrollerComponent, IViewport } from 'ngx-virtual-scroller';

import { Topic } from '../../models/topic';
import { TopicService } from '../../services/topic/topic.service';
import { MessageService } from '../../services/message/message.service';
import { BaseComponent } from '../../base/component/base.component';
import { RP_RESULTS, RP_COUNT, RP_CODE } from '../app-constants';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css'],
})

export class TopicsComponent extends BaseComponent {

  constructor(
    private topicService: TopicService,
    private msgService: MessageService) {
    super();
  }

  @Input() topics: Topic[];
  count = 0;
  loading: boolean;
  private limit = 25;
  private offset = 0;
  private bLoadMore: boolean;

  @ViewChild(VirtualScrollerComponent)
  public virtualScroller: VirtualScrollerComponent;

  /** Selected topic */
  selectedTopic: Topic;

  onInit() {

    // Automatically get data when component is initialized
    this.getTopicsFormService(this.limit, this.offset);
  }

  /**
   * Topic successfully added
   *
   * @param $event EventEmitter<boolean>
   */
  addCallBack($event) {
    if ($event) {
      this.refreshList();
    }
  }

  /**
   * Event Search result
   *
   * @param $event EventEmitter<any>
   */
  searchCallBack($event) {
    const value = this.getElementById('input-search').value;

    // Check input Search length
    if ($event && value.length > 0) {
      this.topics = $event;
    } else {

      // Reload previous data. (Before searching)
      this.getTopicsFormService(this.offset + this.limit, 0);
    }
  }

  /**
   * Load more
   */
  loadMore() {
    this.bLoadMore = true;
    this.offset = this.getLengthTopics();
    if (this.offset > this.count) {
      this.offset = this.count;
    }
    console.log(this.offset);
    this.getTopicsFormService(this.limit, this.offset);
  }

  refreshList() {
    this.getTopicsFormService(this.getLengthTopics(), 0);
  }

  /**
   * Get the Topics list.
   *
   * @param limit number
   * @param offset number
   */
  getTopicsFormService(limit: number, offset: number): void {

    // Clear messages
    this.msgService.clear();

    // Show loading
    this.loading = true;

    // Send a request to retrieve the data, and listen for the results returned.
    this.topicService.getTopics(limit, offset).subscribe((updateTopic) => {
        console.log(updateTopic);
        // results returned
        if (this.bLoadMore) {

          // When click load more
          this.bLoadMore = false;
          this.topics = this.topics.concat(updateTopic[RP_RESULTS]);
        } else {

          // When load first or refresh
          this.topics = updateTopic[RP_RESULTS];
        }

        this.count = updateTopic[RP_COUNT];

        // Hide loading
        this.loading = false;
        this.virtualScroller.childHeight = 1;
      }
    );
  }

  /**
   * Used to get length of topics
   *
   * @returns length: number
   */
  getLengthTopics(): number {
    if (this.topics) {
      return this.topics.length;
    }
    return 0;
  }

  /**
   * Delete topic
   *
   * @param id number
   */
  onDelete(id: number): void {
    this.topicService.onDelete(id).subscribe(result => {

      if (result == null || result[RP_CODE] === 204) {

        // reload data
        this.refreshList();
        alert('Delete successfully!');
      } else {
        alert('Delete failed!');
      }
    });
  }

  /**
   * Action when select a Topic in List item and clear messages
   *
   * @param topic Topic
   */
  onSelect(topic: Topic): void {
    this.msgService.clear();
    this.selectedTopic = topic;
  }
}
