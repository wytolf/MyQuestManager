import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Quest} from "../../shared/models/quest";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class QuestService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getAllQuests() {
    console.log("getActualQuests() wurde aufgerufen");
    const options = this.getStandardOptions();

    options.params = new HttpParams({
      fromObject: {
        format: 'json'
      }
    });
    return this.http.get('assets/quests.json', options);
  }

  getActualQuests() {
    console.log("getActualQuests() wurde aufgerufen");
    const options = this.getStandardOptions();

    options.params = new HttpParams({
      fromObject: {
        format: 'json'
      }
    });

    if (!environment.hasBackendConnection) {
      return this.http.get<Array<Quest>>('assets/quests.json');
    }
    return this.http.get<Array<Quest>>('http://127.0.0.1:4555/api/quests');
  }

  getQuest(id: string) {
    console.log("getQuest() wurde aufgerufen");
    console.log(id);
    let quest: Quest | null = null;

    this.getActualQuests().subscribe((data: Quest[]) => {
      const foundQuest = data.find(q => q.title === id);
      if (foundQuest) {
        quest = foundQuest;
        console.log(quest);
      } else {
        console.log("Quests nicht gefunden");
      }
    });

    console.log(quest);
    return quest;
  }

  addQuest(quest: Quest) {
    console.log("addQuest() wurde aufgerufen");
    console.log(quest);
    return this.http.post<Quest>('http://127.0.0.1:4555/api/quests', quest, this.getStandardOptions()).subscribe();
  }

  updateQuest(quest: Quest) {
    console.log("updateQuest() wurde aufgerufen");
    return this.http.post<Quest>('http://127.0.0.1:4555/api/quests', quest, this.getStandardOptions());

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private getStandardOptions() {
    return {
      header: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: new HttpParams()
    };
  }
}
