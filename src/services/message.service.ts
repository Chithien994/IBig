import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  
  messages: Message[] = [];
  messege: Message = new Message;

  add(message: string, err: boolean) {
    this.messege.setNotfy(message, err);
    this.messages.push(this.messege);
  }

  clear() {
    this.messages = [];
  }
  
  constructor() { }
}

export class Message {
  message: string;
  err: boolean;

  constructor() { }
  
  setNotfy(message: string, err: boolean){
    this.message = message;
    this.err = err
  }
}

