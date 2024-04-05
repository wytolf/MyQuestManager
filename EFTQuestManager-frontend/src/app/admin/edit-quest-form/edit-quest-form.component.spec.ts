import {ComponentFixture, TestBed, tick} from '@angular/core/testing';
import {EditQuestFormComponent} from './edit-quest-form.component';
import {ActivatedRoute, Router} from '@angular/router';
import {QuestService} from '../../quest/quest.service';
import {of} from 'rxjs';
import {FormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";

describe('EditQuestFormComponent', () => {
  let component: EditQuestFormComponent;
  let fixture: ComponentFixture<EditQuestFormComponent>;
  let questService: jasmine.SpyObj<QuestService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditQuestFormComponent],
      providers: [
        {
          provide: QuestService,
          useValue: {
            getActualQuests: () => {
              return of({title: 'questId', link: 'Test Quest', trader: '123', map: '123', id: 123})
            },
            updateQuest: () => {
              return of({title: 'questId', link: 'Test Quest', trader: '123', map: '123', id: 123})
            }
          }
        },
        {provide: ActivatedRoute, useValue: {snapshot: {paramMap: {get: () => 'questId'}}}},
      ],
      imports: [FormsModule, RouterTestingModule]
    }).compileComponents();


    fixture = TestBed.createComponent(EditQuestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get quest when initialized', () => {
    const questService = TestBed.inject(QuestService);

    const fixture = TestBed.createComponent(EditQuestFormComponent);
    const component = fixture.componentInstance;
    const getActualQuestsSpy = spyOn(questService, 'getActualQuests').and.returnValue(of([{
      title: 'questId',
      link: 'Test Quest',
      trader: '123',
      map: '123',
      id: 123
    }]));

    fixture.detectChanges();
    component.ngOnInit();

    expect(getActualQuestsSpy).toHaveBeenCalled();
    fixture.whenStable();

    expect(component.quest).toEqual({title: 'questId', link: 'Test Quest', trader: '123', map: '123', id: 123});
  });

});

