import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Output() wantRegister = new EventEmitter<boolean>();
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
      password: ['', [Validators.required]]
    });
  }

  login() {
    this.isLoggingIn = true;
    console.log("try to login");
    this.authenticationService.signIn({
      email: this.form.value.email,
      password: this.form.value.password
    }).subscribe({
      next: () => {
        console.log("erfolgreich eingeloggt");
        this.authenticationService.rememberUser(this.form.value.email);
        this.router.navigate(['admin'])
      },
      error: error => {
        this.isLoggingIn = false;
        console.log("error while login:" + error);
      }
    });
    this.authenticationService.rememberUser(this.form.value.email);
    console.log("is user logged in after login:" + this.authenticationService.isLoggedIn());

  }

  logout() {
    if (this.authenticationService.isUserLoggedIn) {
      this.authenticationService.logout().subscribe({
        next: () => {
          console.log("user logged out");
          this.router.navigate(['manager']);
        },
        error: error => {
          this.isLoggingIn = false;
          console.log("error while logout:" + error);
        }
      });
    } else {
      console.log("no user to logout, login first");
    }

  }

  register() {
    this.wantRegister.emit(true);
    console.log("register clicked");
  }
}
