import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { QuestDetailsComponent } from './quest-details.component';
import { QuestService } from '../quest.service';
import { Quest } from '../../../shared/models/quest';

describe('QuestDetailsComponent', () => {
  let component: QuestDetailsComponent;
  let fixture: ComponentFixture<QuestDetailsComponent>;
  let mockQuestService: jasmine.SpyObj<QuestService>;

  beforeEach(async () => {
    mockQuestService = jasmine.createSpyObj('QuestService', ['getQuest', 'getActualQuests']);

    await TestBed.configureTestingModule({
      declarations: [QuestDetailsComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of(convertToParamMap({ id: 'testId' })) } },
        { provide: QuestService, useValue: mockQuestService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestDetailsComponent);
    component = fixture.componentInstance;

    component.quest = {id: 1, title: 'title', trader: 'trader', map: 'map', link: 'link'} as Quest;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
