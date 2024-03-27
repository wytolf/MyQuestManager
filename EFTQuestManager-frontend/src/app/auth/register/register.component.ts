import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form!: FormGroup;
  isLoggingIn = false;

  constructor(
    private authenticationService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    console.log("RegisterComponent loaded");
  }

  register() {
    this.isLoggingIn = true;
    console.log("try to register");
    const response = this.authenticationService.register({
      role: this.form.value.role,
      email: this.form.value.email,
      password: this.form.value.password
    });
    console.log(`form data: { username: ${this.form.value.username}, role: ${this.form.value.role}, email: ${this.form.value.email}`);
    console.log(response);
    this.router.navigate(['manager']);
  }
}
