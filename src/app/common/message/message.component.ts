/*
ChiThienTCN
Message Service
*/
import { Component, Input } from '@angular/core';

import { MessageService, Message } from '../../../services/message/message.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent  extends BaseComponent {

  @Input() message: Message;
  constructor(public messageService: MessageService) {
    super();
  }

  onInit(): void {
  }

}
