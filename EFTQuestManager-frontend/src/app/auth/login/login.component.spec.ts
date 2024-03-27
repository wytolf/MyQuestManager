import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../auth.service';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['signIn', 'rememberUser', 'isLoggedIn', 'logout']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [{ provide: AuthService, useValue: authServiceSpy }, FormBuilder],
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call signIn method when login() is called', () => {
    const credentials = { email: 'test@example.com', password: 'password123' };
    //stubbing the methods of the authService
    authService.signIn.and.returnValue(of(null)); //signIn method replaced with stub which returns an observable of null
    authService.rememberUser.and.stub();
    authService.isLoggedIn.and.returnValue(false); //simulate user is not logged in

    component.form.setValue(credentials);
    component.login();

    expect(authService.signIn).toHaveBeenCalledWith(credentials);
  });

  it('should emit wantRegister event when register() is called', () => {
    const emitSpy = spyOn(component.wantRegister, 'emit');

    component.register();

    expect(emitSpy).toHaveBeenCalledWith(true);
  });
});
