import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // Register model (Used for template-driven forms)
  register: object = {'username': '', 'password': ''};

  constructor() { }

  ngOnInit() {
  }

  onRegister(username: string, password: string): void {

  }
}
