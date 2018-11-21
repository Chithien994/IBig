/*
ChiThienTCN
Topic - detail Component
*/
import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

import { Topic } from '../../models/topic';
//Router
import { ActivatedRoute } from '@angular/router';
import { TopicService } from '../../services/topic.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css']
})
export class TopicDetailComponent implements OnInit {

  @Input() topic: Topic; 

  constructor(
    private route: ActivatedRoute,
    private topicService: TopicService,
    private location: Location,
    private msgService: MessageService
    ) { }

  ngOnInit() {
    this.getTopicFromRoute();
  }

  getTopicFromRoute(): void {
    this.msgService.clear();
    const id = +this.route.snapshot.paramMap.get('id');
    this.topicService.getTopicFromId(id).subscribe(topic => this.topic = topic);        
  }

  onUpdate(name: string, user: number): void {
    this.msgService.clear();
    this.topicService.update(new Topic().getParams(this.topic.id, user, name)).subscribe(result => {
      
      console.log(`code: ${JSON.stringify(result)}`);
      if(typeof result['code'] === 'undefined' || result['code'] == 200){

        this.msgService.add('Successed!',false);
        this.topic.name = name;
        this.topic.user = user;
        if(this.route.snapshot.paramMap.get('id')){
          this.goBack();
        }
      }else{
        this.msgService.add(result['message'],true);
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}
