import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {QuestService} from "../quest.service";
import {Quest} from "../../../shared/models/quest";

@Component({
  selector: 'quest-details',
  templateUrl: './quest-details.component.html',
  styleUrl: './quest-details.component.css'
})
export class QuestDetailsComponent {
  quest: Quest | undefined;

  constructor(private quests: QuestService, private route: ActivatedRoute) {
    route.params.subscribe(val => {
      let id = val["id"];
      console.log(id);
      if (id) {
        console.log(this.quests.getQuest(id));
        this.quests.getActualQuests().subscribe((data: any) => {
          for (let i = 0; i < data.length; i++) {
            if (data[i].title === id) {
              this.quest = data[i];
              break;
            }
          }
        });
      }
    });
  }
}
