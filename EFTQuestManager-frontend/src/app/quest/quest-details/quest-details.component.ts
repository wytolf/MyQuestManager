import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {QuestService} from "../quest.service";
import {Quest} from "../../../shared/models/quest";

@Component({
  selector: 'quest-details',
  templateUrl: './quest-details.component.html',
  styleUrl: './quest-details.component.css'
})
export class QuestDetailsComponent implements OnInit{
  quest: Quest | undefined;

  constructor(private quests: QuestService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(val => {
      const id = val["id"];
      console.log(id);
      if (id) {
        console.log(this.quests.getQuest(id));
        this.quests.getActualQuests().subscribe((data: Quest[]) => {
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
