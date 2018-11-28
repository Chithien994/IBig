import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';

/**
 * @description
 * Add this component to item location on the template (html),
 * to use the delete function.
 * You can customize the interface with class.
 *
 * @param title: string
 * @param message: string
 * @param id: any
 *
 * @callback event EventEmitter<any>()
 *
 * @example
 * <app-delete-modal
 *    (event)="onDelete($event)"
 *    [title]="'Confirm delete?'"
 *    [message]="'Do you want to delete: example?'"
 *    [id]="exampleId">
 * </app-delete-modal>
 *
 * Add to template
 */
@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {

  /** Get data from parents */
  @Input() title: string;
  @Input() message: string;
  @Input() id: any;

  /** Initialize an event notifying parents */
  @Output() event = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  /**
   * Send request to parents to reload the data.
   *
   * @param id any
   */
  onDelete(id) {

    // Send request to parents to reload the data.
    this.event.emit(id);
  }

}
