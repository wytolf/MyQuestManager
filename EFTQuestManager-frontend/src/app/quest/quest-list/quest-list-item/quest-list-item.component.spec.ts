import {ComponentFixture, TestBed} from '@angular/core/testing';
import {QuestListItemComponent} from './quest-list-item.component';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from '../../../auth/auth.service';
import {Quest} from '../../../../shared/models/quest';
import {Router} from '@angular/router';
import {AuthModule} from "../../../auth/auth.module";

describe('QuestListItemComponent', () => {
  let component: QuestListItemComponent;
  let fixture: ComponentFixture<QuestListItemComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    await TestBed.configureTestingModule({
      declarations: [QuestListItemComponent],
      imports: [RouterTestingModule, AuthModule],
      providers: [{provide: AuthService, useValue: authServiceSpy}]
    }).compileComponents();


  });

  beforeEach(() => {
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(QuestListItemComponent);
    component = fixture.componentInstance;
    // Initialize quest input
    component.quest = {id: 1, title: 'title', trader: 'trader', map: 'map', link: 'link'} as Quest;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isAdmin to true if user is logged in as admin', () => {
    authService.isLoggedIn.and.returnValue(true);
    authService.user = {role: 'admin', email: 'email', activeQuests: []};
    fixture.detectChanges();
    expect(component.isAdmin).toBeTrue();
  });
});
