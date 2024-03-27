import {Component, Input} from '@angular/core';
import {Quest} from "../../../shared/models/quest";

@Component({
  selector: 'quest-list',
  templateUrl: './quest-list.component.html',
  styleUrl: './quest-list.component.css'
})
export class QuestListComponent {
  @Input() quests: Quest[] = [];
}
