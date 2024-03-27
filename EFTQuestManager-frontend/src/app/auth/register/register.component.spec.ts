import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['register']);

    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: AuthService, useValue: authServiceSpy }, FormBuilder, Router]
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form properly', () => {
    expect(component.form).toBeDefined();
    expect(component.form.get('email')).toBeTruthy();
    expect(component.form.get('role')).toBeTruthy();
    expect(component.form.get('password')).toBeTruthy();
  });

  it('should call register method of AuthService and navigate to manager when register is called', () => {
    const userData = {
      email: 'test@example.com',
      role: 'user',
      password: 'password123'
    };
    const emptyPromise: Promise<any> = Promise.resolve();
    authService.register.and.returnValue(emptyPromise);
    const navigateSpy = spyOn(router, 'navigate');

    component.form.setValue(userData);
    component.register();

    expect(authService.register).toHaveBeenCalledWith(userData);
    expect(navigateSpy).toHaveBeenCalledWith(['manager']);
  });
});

