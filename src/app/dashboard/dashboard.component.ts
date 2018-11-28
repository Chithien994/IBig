/*
ChiThienTCN
Dashboard Component
*/
import { Component, OnInit, ViewChild } from '@angular/core';
import { TopicService } from '../../services/topic/topic.service';
import { Topic } from '../../models/topic';
import { ChangeEvent, VirtualScrollerComponent } from 'ngx-virtual-scroller';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  topics: Topic[] = [];

  @ViewChild(VirtualScrollerComponent)
  public virtualScroller: VirtualScrollerComponent;

  constructor(private topicService: TopicService) { }

  ngOnInit() {
    this.getTopics();
  }

  getTopics(): void {
    this.topicService.getTopics(25, 0).subscribe(topics => this.topics = topics['results'].slice(1, 11));
    this.virtualScroller.horizontal = true;
    this.virtualScroller.childHeight = 200;
  }

}
