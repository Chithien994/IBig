import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-base'
})
export abstract class BaseComponent implements OnInit {

  constructor() {}

  private location: Location;

  /**
   * A lifecycle hook that is called after Angular has initialized.
   * All data-bound properties of a directive.
   */
  abstract onInit(): void;

  ngOnInit() {
    this.onInit();
   // console.log(JSON.stringify(this.paramMap));
  }

  /**
   * Get element in html by id
   *
   * @param id string
   */
  getElementById(id: string): HTMLInputElement {
    return (<HTMLInputElement>document.getElementById(id));
  }

  /**
   * Go to page
   *
   * @param path string
   */
  goToPage(path: string): void {
    window.location.href = path;
  }

  /**
   * Go back
   */
  goBack(): void {
    this.location.back();
  }
}
