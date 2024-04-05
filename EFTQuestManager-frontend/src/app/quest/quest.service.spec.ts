import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { QuestService } from './quest.service';
import { Quest } from '../../shared/models/quest';
import { environment } from '../../environments/environment';

describe('QuestService', () => {
  let service: QuestService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [QuestService]
    });
    service = TestBed.inject(QuestService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return actual quests when getActualQuests is called', () => {
    const dummyQuests: Quest[] = [
      { id: 1, title: 'Quest 1', trader: 'Description 1', map: 'map 1', link: 'link1' },
      { id: 2, title: 'Quest 2', trader: 'Description 2', map: 'map 2', link: 'link 2' }
    ];

    service.getActualQuests().subscribe(quests => {
      expect(quests).toEqual(dummyQuests);
    });

    const req = httpTestingController.expectOne(`${environment.hasBackendConnection ? 'http://127.0.0.1:4555/api/quests' : 'assets/quests.json'}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyQuests);
  });

  it('should add a quest when addQuest is called', () => {
    const newQuest: Quest = { id: 3, title: 'Quest 3', trader: 'Description 3', map: 'map 3', link: 'link3' };

    service.addQuest(newQuest);

    const req = httpTestingController.expectOne('http://127.0.0.1:4555/api/quests');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newQuest);
    req.flush(newQuest);
  });

  it('should update a quest when updateQuest is called', () => {
    const updatedQuest: Quest = { id: 1, title: 'Updated Quest', trader: 'Updated Description', map: 'Updated map', link: 'updatedlink' };

    service.updateQuest(updatedQuest).subscribe();

    const req = httpTestingController.expectOne('http://127.0.0.1:4555/api/quests');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(updatedQuest);
    req.flush(updatedQuest);
  });
});
