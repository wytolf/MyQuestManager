import {Component} from '@angular/core';
import {AuthService} from "./auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EFTQuestManager-frontend';

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
