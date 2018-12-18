import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // Register model (Used for template-driven forms)
  register: object = { 'phone': '', 'password': '', 'confirmPassword': '',
   'formRegister': '', 'firstName': '', 'lastName': '', 'email': '', 'countryCode': ''};

  /** Show icon is in progress, and disable "Sign in" button, if "loading" is true. False in reverse. */
  loading: boolean;

  constructor() { }

  ngOnInit() {
    this.loading = false;
  }

  onRegister(username: string, password: string): void {

  }
}
