import {Component, OnInit} from '@angular/core';
import {Quest} from "../../shared/models/quest";
import {QuestService} from "./quest.service";

@Component({
  selector: 'app-quest',
  templateUrl: './quest.component.html',
  styleUrl: './quest.component.css'
})
export class QuestComponent implements OnInit {
  quests!: Quest[];

  constructor(private questService: QuestService) {
  }

  ngOnInit(): void {
    this.questService.getActualQuests()
      .subscribe((data: any) => {
        this.quests = data;
      });
  }
}
