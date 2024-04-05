import {TestBed, ComponentFixture, inject} from '@angular/core/testing';
import {AdminComponent} from './admin.component';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';
import {QuestComponent} from "../quest/quest.component";
import {QuestModule} from "../quest/quest.module";
import {AuthModule} from "../auth/auth.module";

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn', 'user']);

    await TestBed.configureTestingModule({
      declarations: [AdminComponent],
      imports: [
        RouterTestingModule,
        QuestModule,
        AuthModule
      ],
      providers: [{provide: AuthService, useValue: authServiceSpy}],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

});

