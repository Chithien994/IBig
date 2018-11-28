import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';

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
