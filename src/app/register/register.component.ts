import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  memberships = ["Business", "Customer"];

  constructor() {}

  ngOnInit(): void {}

  registerForm = new FormGroup({
    name: new FormControl(""),
    email: new FormControl(""),
    password: new FormControl(""),
    confirmationPassword: new FormControl(""),
    membership: new FormControl(""),
  });

  onSubmit() {
    
  }
}
