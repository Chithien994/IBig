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

  topics: Topic[]

  constructor(private topicService: TopicService, private msgService: MessageService) { }

  ngOnInit() {

    ////Automatically get data when component is initialized
    this.getTopicsFormService()
  }

  /**
   * 
   * @param $event
   */
  receiveMessage($event) {
    console.log($event)
    if($event){
      this.getTopicsFormService()
    }
  }

  /**
   * Get the Topics list.
   */
  getTopicsFormService(): void {

    //Clear messages
    this.msgService.clear()

    //Send a request to retrieve the data, and listen for the results returned.
    this.topicService.getTopics().subscribe((updateTopic) => {

        //results returned
        this.topics = updateTopic['results']
      }
    );
  }

  /**
   * Delete topic
   * 
   * @param id number
   */
  onDelete(id: number): void{
    this.topicService.onDelete(id).subscribe(result =>{

      if(result == null || result['code'] == 204){

        //reload data
        this.getTopicsFormService()
        alert("Delete successfully!")
      }else{
        alert("Delete failed!")
      }
    })
  }

  /** Selected topic */
  selectedTopic: Topic

  /**
   * Action when select a Topic in List item and clear messages
   * 
   * @param topic Topic
   */
  onSelect(topic: Topic): void {
    this.msgService.clear()
    this.selectedTopic = topic
  }

}
