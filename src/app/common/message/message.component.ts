/*
ChiThienTCN
Message Service
*/
import { Component, OnInit } from '@angular/core';

import { MessageService } from '../../../services/message/message.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent  extends BaseComponent {

  constructor(public messageService: MessageService) {
    super();
  }

  onInit(): void {
  }

}
