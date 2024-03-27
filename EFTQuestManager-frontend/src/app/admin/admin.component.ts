import {Component} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  constructor(authService: AuthService, router: Router) {
    if (authService.isLoggedIn()) {
      console.log(authService.user);
      const userRole = authService.user?.role;
      if (userRole === "admin") {
        console.log("youre an admin");
      } else {
        console.log("youre not an admin, your role is: " + userRole);
        router.navigate(['/manager']);
      }
    } else {
      router.navigate(['/login']);
    }
  }
}
