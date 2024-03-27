import {Component, Input} from '@angular/core';
import {Quest} from "../../../../shared/models/quest";
import {Router} from "@angular/router";
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'quest-list-item',
  templateUrl: './quest-list-item.component.html',
  styleUrl: './quest-list-item.component.css'
})
export class QuestListItemComponent {
  @Input() quest!: Quest;
  isAdmin: boolean = false;

  constructor(private router: Router, private authService: AuthService) {
    if (authService.isLoggedIn()) {
      const userRole = authService.user?.role;
      if (userRole === "admin") {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
        this.router.navigate(['/manager']);
      }
    } else {
      this.isAdmin = false;
      this.router.navigate(['/login']);
    }
  }
}
