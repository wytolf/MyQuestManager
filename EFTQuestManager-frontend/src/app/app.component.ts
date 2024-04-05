import {Component, OnInit} from '@angular/core';
import {AuthService} from "./auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'EFTQuestManager-frontend';

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      console.log(this.authService.user);
      const userRole = this.authService.user?.role;
      if (userRole === "admin") {
        console.log("you're an admin");
      } else {
        console.log("you're not an admin, your role is: " + userRole);
        this.router.navigate(['/manager']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
}
