import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from "../auth.service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  userForm: FormGroup;
  serviceErrors: any = {};
  registered = false;
	submitted = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, public authService: AuthService) {

  }

  invalidFirstName()
  {
  	return (this.submitted && this.userForm.controls.first_name.errors != null);
  }

  invalidLastName()
  {
  	return (this.submitted && this.userForm.controls.last_name.errors != null);
  }

  invalidEmail()
  {
  	return (this.submitted && this.userForm.controls.email.errors != null);
  }

  invalidPassword()
  {
  	return (this.submitted && this.userForm.controls.password.errors != null);
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      _id: [],
      first_name: ['', [Validators.required, Validators.maxLength(50)]],
      last_name: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(75)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit() {
    this.submitted = true;

  	if(this.userForm.invalid == true)
  	{
  		return;
  	}
    this.authService.register(this.userForm.value)
      .subscribe( data => {
        this.registered = true;
        this.router.navigate(['/login']);
      });
  }

};