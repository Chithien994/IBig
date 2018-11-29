import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: Message[] = [];
  message: Message = new Message;

  /**
   * Add message content, and message type.
   * The error err is true, not false.
   *
   * @param message string
   * @param err boolean
   */
  add(message: string, err: boolean) {
    this.message.setNotfy(message, err);
    this.messages.push(this.message);
  }

  /**
   * Add message content 'Successed', with success type.
   */
  onSuccess() {
    this.add('Successed!', false);
  }

  /**
   * Add message content with input, with success type.
   *
   * @param message string
   */
  setSuccess(message: string) {
    this.add(message, false);
  }

  /**
   * Add message content 'Failure', with failure type.
   */
  onFailure() {
    this.add('Failure!', true);
  }

  /**
   * Add message content with input, with failure type.
   *
   * @param message string
   */
  setFailure(message: string) {
    this.add(message, true);
  }


  /**
   * Delete all notifications.
   * Only return true
   */
  clear(): boolean {
    this.messages = [];
    return true;
  }

  constructor() { }
}

/**
 * Model notifications.
 */
export class Message {
  message: string;
  err: boolean;

  constructor() { }

  setNotfy(message: string, err: boolean) {
    this.message = message;
    this.err = err;
  }
}

