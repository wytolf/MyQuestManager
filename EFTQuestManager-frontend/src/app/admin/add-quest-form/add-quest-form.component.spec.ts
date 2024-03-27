import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddQuestFormComponent } from './add-quest-form.component';
import { QuestService } from '../../quest/quest.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Quest } from '../../../shared/models/quest';
import {Subscription} from 'rxjs';

describe('AddQuestFormComponent', () => {
  let component: AddQuestFormComponent;
  let fixture: ComponentFixture<AddQuestFormComponent>;
  let questService: jasmine.SpyObj<QuestService>;

  beforeEach(async () => {
    const questServiceSpy = jasmine.createSpyObj('QuestService', ['addQuest']);

    await TestBed.configureTestingModule({
      declarations: [AddQuestFormComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: QuestService, useValue: questServiceSpy }]
    }).compileComponents();

    questService = TestBed.inject(QuestService) as jasmine.SpyObj<QuestService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQuestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addQuest method with correct data when form is submitted', () => {
    const newQuestData = {
      questTitle: 'New Quest Title',
      questTrader: 'Trader Name',
      questLink: 'https://example.com',
      questMap: 'Map Name'
    };
    component.questForm.setValue(newQuestData);
    const expectedQuest = new Quest(-1, newQuestData.questTitle, newQuestData.questTrader, newQuestData.questMap, newQuestData.questLink);
    const emptySubscription: Subscription = new Subscription();
    questService.addQuest.and.returnValue(emptySubscription);

    component.submitForm();

    expect(questService.addQuest).toHaveBeenCalledWith(expectedQuest);
  });
});

