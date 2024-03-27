import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminComponent} from './admin.component';
import {QuestModule} from "../quest/quest.module";
import {RouterLink} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EditQuestFormComponent} from './edit-quest-form/edit-quest-form.component';
import {AddQuestFormComponent} from "./add-quest-form/add-quest-form.component";


@NgModule({
  declarations: [
    AdminComponent,
    EditQuestFormComponent,
    AddQuestFormComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    QuestModule
  ],
  exports: [
    AdminComponent,
    EditQuestFormComponent,
    AddQuestFormComponent
  ]
})
export class AdminModule {
}
