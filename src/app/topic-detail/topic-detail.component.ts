/*
ChiThienTCN
Topic - detail Component
*/
import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

import { Topic } from '../../models/topic';
//Router
import { ActivatedRoute } from '@angular/router';
import { TopicService } from '../topic.service';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css']
})
export class TopicDetailComponent implements OnInit {

  @Input() topic: Topic; 

  constructor(
    public route: ActivatedRoute,
    public topicService: TopicService,
    public location: Location,
    ) { }

  ngOnInit() {
    this.getTopicFromRoute();
  }

  getTopicFromRoute(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(`this.route.snapshot.paramMap = ${JSON.stringify(this.route.snapshot.paramMap)}`);
    //Call service to "get movie from id" ?
    this.topicService.getTopicFromId(id).subscribe(topic => this.topic = topic);        
  }

  param: Object = {};
  onUpdate(name: string, user: number): void {
    this.topic.name = name;
    this.topic.user = user;
    this.topicService.update(new Topic().getParams(this.topic)).subscribe(() => {
      if(this.route.snapshot.paramMap.get('id')){
        this.goBack();
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}
