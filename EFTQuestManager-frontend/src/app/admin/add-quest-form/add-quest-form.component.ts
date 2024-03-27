import { Component } from '@angular/core';
import {QuestService} from "../../quest/quest.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Quest} from "../../../shared/models/quest";

@Component({
  selector: 'app-add-quest-form',
  templateUrl: './add-quest-form.component.html',
  styleUrl: './add-quest-form.component.css'
})
export class AddQuestFormComponent {

  constructor(private service: QuestService) {
  }

  questForm = new FormGroup({
    questTitle : new FormControl('', [Validators.required]),
    questTrader : new FormControl('', [Validators.required]),
    questLink : new FormControl('', [Validators.required]),
    questMap : new FormControl('', [Validators.required])
  })

  submitForm() {
    console.log(this.questForm.value) //ist immer true, wenn es keine Validatoren gibt
    const newQuest = new Quest(-1, this.questForm.value.questTitle!.toString(), this.questForm.value.questTrader!.toString(), this.questForm.value.questMap!.toString(), this.questForm.value.questLink!.toString());
    this.service.addQuest(newQuest);
  }
}
