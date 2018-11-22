/*
ChiThienTCN
Topic - detail Component
*/
import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { Location } from '@angular/common';

import { Topic } from '../../models/topic';
import { User } from '../../models/user';

/** Router */
import { ActivatedRoute } from '@angular/router';

/** Service */
import { TopicService } from '../../services/topic.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css']
})
export class TopicDetailComponent implements OnInit {

  /** Get data from parents */
  @Input() topic: Topic

  /** Initialize an event notifying parents */
  @Output() messageEvent = new EventEmitter<boolean>()

  users: User[]
  user = new User

  constructor(
    private route: ActivatedRoute,
    private topicService: TopicService,
    private location: Location,
    private msgService: MessageService
    ) { }

  ngOnInit() {

    //Automatically get data when component is initialized
    this.getUsers();
    this.getTopicFromID()
  }

  /**
   * Get users
   */
  getUsers(){
    this.topicService.auth.getUsers().subscribe(results => {
      this.users = results['results']
    })
  }

  /**
   * Get data by id
   */
  getTopicFromID(): void {

    //Clear message
    this.msgService.clear()

    //get id from param map
    const id = +this.route.snapshot.paramMap.get('id')
    if(id > 0){
      this.topicService.getTopicFromId(id).subscribe(topic => this.topic = topic)
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
    this.msgService.clear()
    this.topicService.update(new Topic().getParams(this.topic.id, user, name)).subscribe(result => {
      
      console.log(`code: ${JSON.stringify(result)}`);
      if(result != null && result['status'] == 200 || result['code'] == 200 || result['id']){

        ////Topic successfully updated.

        //Go back if you are on the details page.
        if(this.route.snapshot.paramMap.get('id')){
          this.goBack()
        }else{

          //Reset data
          this.topic.name = name
          this.topic.user = user

          //Successful notification.
          this.msgService.onSuccess()
        }
      }else{

        //Notification failed
        this.msgService.setFailure(result['message'])
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
    this.happy()//Hỏi người dùng khi thêm quá nhiều

    this.msgService.clear();
    this.topicService.addTopic(new Topic().getParams(this.topic.id, user, name)).subscribe(result => {
      if(result != null && result['status'] == 200 || result['code'] == 200 || result['id']){
    
        //Topic successfully added
        
        // Lưu lại số lần thêm thành công
        sessionStorage.setItem("add",(+sessionStorage.getItem("add")+1)+"")

        ////Go back if you are on the details page.
        if(this.route.snapshot.paramMap.get('id')){
          this.goBack()
        }else{

          //Send request to parents to reload the data.
          this.messageEvent.emit(true)

          //Successful notification.
          this.msgService.onSuccess()
        }
      }else{

        //Notification failed
        this.msgService.setFailure(result['message'])
      }
      
    });

  }

  /** 
   * Go back
   */
  goBack(): void {
    this.location.back()
  }

  happy(){
    if(+sessionStorage.getItem("add")>2){
      alert('Có rãnh lắm không???')
      sessionStorage.setItem("add","0");
    }
  }
}
