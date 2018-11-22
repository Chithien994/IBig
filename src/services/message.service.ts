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

  onSuccess(){
    this.add('Successed!',false);
  }

  setSuccess(message: string){
    this.add(message,false);
  }

  onFailure(){
    this.add('Failure!',true);
  }

  setFailure(message: string){
    this.add(message,true);
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

