import {TestBed, ComponentFixture} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from './auth/auth.service';
import {Router} from '@angular/router';
import {AuthModule} from "./auth/auth.module";
import {NavigationModule} from "./navigation/navigation.module";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn', 'user']);
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        RouterTestingModule,
        NavigationModule,
        AuthModule
      ],
      providers: [{provide: AuthService, useValue: authServiceSpy}],
    }).compileComponents();


  });

  beforeEach(() => {
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to login when user is not logged in', () => {
    // Mock isLoggedIn to return false
    authService.isLoggedIn.and.returnValue(false);

    const navigateSpy = spyOn(router, 'navigate').and.stub();

    // Trigger ngOnInit
    fixture.detectChanges();

    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });

  it('should navigate to manager when user is logged in as non-admin', () => {
    authService.isLoggedIn.and.returnValue(true);
    authService.user = {role: 'user', email: '', activeQuests: []};
    const navigateSpy = spyOn(router, 'navigate');

    fixture.detectChanges();

    expect(navigateSpy).toHaveBeenCalledWith(['/manager']);
  });
});


