/*
ChiThienTCN
Topics Component
*/
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ChangeEvent, VirtualScrollerComponent } from 'ngx-virtual-scroller';

import { Topic } from '../../models/topic';
import { TopicService } from '../../services/topic.service';
import { MessageService } from '../../services/message.service'

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css'],
})

export class TopicsComponent implements OnInit {

  @Input() topics: Topic[]

  @ViewChild(VirtualScrollerComponent)
  public virtualScroller: VirtualScrollerComponent;

  constructor(
    private topicService: TopicService,
    private msgService: MessageService) {
  }

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

  protected loading: boolean;


  /**
   * Called when changes count in a list
   * 
   * @param event ChangeEvent
   */
  protected onChangeEvent(event: ChangeEvent) {
    console.log("ChangeEvent")
  }

  /**
   * Call this function after resize + animation end
   */
  afterResize() {
    this.virtualScroller.refresh();
  }

  /**
   * Get the Topics list.
   */
  getTopicsFormService(): void {

    //Clear messages
    this.msgService.clear()

    //Show loading
    this.loading = true;

    //Send a request to retrieve the data, and listen for the results returned.
    this.topicService.getTopics(25,0).subscribe((updateTopic) => {

        //results returned
        this.topics = updateTopic['results']
        
        //Hide loading
        this.loading = false;
        this.virtualScroller.childHeight = 10;
    
      }
    );
  }

  /**
   * Used to get length of topics
   * 
   * @returns length: number
   */
  getLengthTopics(): number{
    if(this.topics){
      return this.topics.length
    }
    return 0;
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
