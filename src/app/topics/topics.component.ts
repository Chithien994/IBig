/*
ChiThienTCN
Topics Component
*/
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ChangeEvent, VirtualScrollerComponent, IViewport } from 'ngx-virtual-scroller';

import { Topic } from '../../models/topic';
import { TopicService } from '../../services/topic/topic.service';
import { MessageService } from '../../services/message/message.service'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css'],
})

export class TopicsComponent implements OnInit {

  @Input() topics: Topic[]
  count: number = 0
  loading: boolean;
  private limit: number = 25
  private offset: number = 0
  private bLoadMore: boolean

  @ViewChild(VirtualScrollerComponent)
  public virtualScroller: VirtualScrollerComponent;

  constructor(
    private topicService: TopicService,
    private msgService: MessageService) {
  }

  ngOnInit() {

    ////Automatically get data when component is initialized
    this.getTopicsFormService(this.limit, this.offset)
  }

  /**
   * Topic successfully added
   * 
   * @param $event
   */
  receiveMessage($event) {
    if($event){
      this.refreshList()
    }
  }

  /**
   * Event Search result
   * 
   * @param $event
   */
  onSearch($event){
    this.topics = $event
  }

  /**
   * Load more
   */
  loadMore(){
    this.bLoadMore = true
    this.offset = this.getLengthTopics()
    if(this.offset > this.count){
      this.offset = this.count
    }
    console.log(this.offset)
    this.getTopicsFormService(this.limit, this.offset)
  }

  refreshList(){
    this.getTopicsFormService(this.getLengthTopics(), 0)
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
  getTopicsFormService(limit: number, offset: number): void {

    //Clear messages
    this.msgService.clear()

    //Show loading
    this.loading = true;

    //Send a request to retrieve the data, and listen for the results returned.
    this.topicService.getTopics(limit,offset).subscribe((updateTopic) => {

        //results returned
        if(this.bLoadMore){

          //When click load more
          this.bLoadMore = false
          this.topics = this.topics.concat(updateTopic['results'])
        }else{

          //When load first or refresh 
          this.topics = updateTopic['results']
        }
        
        this.count = updateTopic['count']
        
        //Hide loading
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
        this.refreshList()
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
