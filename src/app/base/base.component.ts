import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base'
})
export abstract class BaseComponent implements OnInit {

  abstract appOnInit();

  constructor() {}

  ngOnInit() {
    this.appOnInit();
  }

  getElementById(id: string): HTMLInputElement {
    return (<HTMLInputElement>document.getElementById(id));
  }
}
