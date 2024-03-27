import {Component} from '@angular/core';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  wantRegister!: boolean;

  onRegister(wantRegister: boolean) {
    this.wantRegister = wantRegister;
  }

}

