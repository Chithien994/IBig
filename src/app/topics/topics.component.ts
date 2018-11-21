/*
ChiThienTCN
Topics Component
*/
import { Component, OnInit } from '@angular/core';
import { Topic } from '../../models/topic';
import { TopicService } from '../../services/topic.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {

  topics: Topic[];
  constructor(private topicService: TopicService, private msgService: MessageService) { }

  getTopicsFormService(): void {
    this.msgService.clear();
    this.topicService.getTopics().subscribe(
      (updateTopic) => {
        this.topics = updateTopic['results'];
        console.log(`this.topics = ${JSON.stringify(this.topics)}`);
      }
    );
  }

  ngOnInit() {
    this.getTopicsFormService();
  }

  //Action when select a Topic in List item
  selectedTopic: Topic;
  onSelect(topic: Topic): void {
    this.msgService.clear();
    this.selectedTopic = topic;
    this.topicService.message = "";
  }

}
