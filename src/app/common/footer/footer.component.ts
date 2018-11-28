/*
ChiThienTCN
Footer Component
*/
import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent extends BaseComponent {

  constructor() {
    super();
  }

  onInit(): void {
  }

}
