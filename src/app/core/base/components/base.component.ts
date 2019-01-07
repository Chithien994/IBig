import { OnInit } from '@angular/core';

export abstract class BaseComponent implements OnInit {

  constructor() {}

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
   * Go to page.
   * If "path = 'null", it will be set with default value "path =' / '" (Go to home page).
   *
   * @param path default value "/"
   */
  goToPage(path = '/'): void {
    window.location.href = path;
  }

  /**
   * Go back
   */
  goBack(): void {
    window.history.back();
  }

  /**
   * Go to home page
   *
   * @param path string
   */
  goToHome(): void {
    this.goToPage();
  }

  /**
   * Get current path
   *
   * @returns path
   *
   * @example
   * http://localhost:4200/example/15
   * return '/example/15'
   */
  getPath(): string {
    return window.location.pathname;
  }
}
