import {TestBed, ComponentFixture} from '@angular/core/testing';
import {AdminComponent} from './admin.component';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';
import {QuestModule} from "../quest/quest.module";
import {AuthModule} from "../auth/auth.module";

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

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
    TestBed.inject(Router);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

});

