import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuestListComponent} from "./quest-list/quest-list.component";
import {QuestDetailsComponent} from "./quest-details/quest-details.component";
import {QuestListItemComponent} from "./quest-list/quest-list-item/quest-list-item.component";
import {HttpClientModule} from "@angular/common/http";
import {QuestComponent} from './quest.component';
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    QuestListComponent,
    QuestDetailsComponent,
    QuestListItemComponent,
    QuestComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    QuestListComponent,
    QuestDetailsComponent,
    QuestListItemComponent,
    QuestComponent
  ]
})
export class QuestModule {
}
