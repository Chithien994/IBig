import {Component, Input, ElementRef} from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent {
  @Input() title: string;
  message: string;
  @Input() modalId: string;
  @Input() modalType = 'modal-lg';
  @Input() isCloseButton: boolean;
  @Input() isOkButton: boolean;
  @Input() isOkCancelButton: boolean;
  @Input() isYesNoButton: boolean;
  @Input() isFade = true;
  @Input() isCloseWhenClickOnButton = true;

  constructor(private el: ElementRef) {
  }

  yesClicked() {
    this.el.nativeElement
      .dispatchEvent(new CustomEvent('yes-clicked', {
        detail: '1111'
      }));
  }

  noClicked() {
    this.el.nativeElement
      .dispatchEvent(new CustomEvent('no-clicked', {
        detail: ''
      }));
  }

  show(title: string, message: string) {
    this.title = title;
    this.message = message;
    $('#' + this.modalId).modal({show: true, backdrop: 'static'});
  }
}
