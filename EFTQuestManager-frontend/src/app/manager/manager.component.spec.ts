import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { ManagerComponent } from './manager.component';
import { AuthService } from '../auth/auth.service';
import {AuthModule} from "../auth/auth.module";
import {NavigationModule} from "../navigation/navigation.module";
import {QuestModule} from "../quest/quest.module";

describe('ManagerComponent', () => {
  let component: ManagerComponent;
  let fixture: ComponentFixture<ManagerComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn']);

    await TestBed.configureTestingModule({
      declarations: [ ManagerComponent ],
      imports: [ RouterTestingModule, AuthModule, NavigationModule, QuestModule ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    })
      .compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to login if not logged in', () => {
    authService.isLoggedIn.and.returnValue(false);
    spyOn(router, 'navigate');

    component.ngOnInit();

    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
