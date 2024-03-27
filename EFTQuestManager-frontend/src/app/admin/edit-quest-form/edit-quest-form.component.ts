import {Component, OnInit} from '@angular/core';
import {QuestService} from "../../quest/quest.service";
import {Quest} from "../../../shared/models/quest";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-quest-form',
  templateUrl: './edit-quest-form.component.html',
  styleUrl: './edit-quest-form.component.css'
})
export class EditQuestFormComponent implements OnInit {
  quest: Quest | undefined;

  constructor(private service: QuestService, private route: ActivatedRoute, private angularRouter: Router) {
  }

  ngOnInit(): void {
    this.getQuest();
  }

  getQuest(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.service.getActualQuests().subscribe((data: any) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].title === id) {
          this.quest = data[i];
          break;
        }
      }
    });
  }

  goBack(): void {
    this.angularRouter.navigate(['/manager']);
  }

  save(): void {
    if (this.quest) {
      this.service.updateQuest(this.quest)
        .subscribe(() => this.goBack());
    }
  }
}
