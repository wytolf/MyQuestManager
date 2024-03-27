import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManagerComponent} from './manager.component';
import {QuestModule} from "../quest/quest.module";


@NgModule({
  declarations: [
    ManagerComponent
  ],
  imports: [
    CommonModule,
    QuestModule,
  ],
  exports: [
    ManagerComponent
  ]
})
export class ManagerModule {
}
