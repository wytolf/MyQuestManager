import {Component} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css'
})
export class ManagerComponent {

  constructor(authService: AuthService, router: Router) {
    if (!authService.isLoggedIn()) {
      router.navigate(['/login']);
    }
  }
}
