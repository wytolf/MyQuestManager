import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ManagerComponent} from "./manager/manager.component";
import {AdminComponent} from "./admin/admin.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {QuestDetailsComponent} from "./quest/quest-details/quest-details.component";
import {AddQuestFormComponent} from "./admin/add-quest-form/add-quest-form.component";
import {EditQuestFormComponent} from "./admin/edit-quest-form/edit-quest-form.component";
import {AuthComponent} from "./auth/auth.component";

const routes: Routes = [
  {path: '', redirectTo: 'manager', pathMatch: 'full'},
  {path: 'login', component: AuthComponent},
  {path: 'manager', component: ManagerComponent},
  {path: 'quest/new', component: AddQuestFormComponent},
  {path: 'quest/:id', component: QuestDetailsComponent},
  {path: 'quest/edit/:id', component: EditQuestFormComponent},
  {path: 'admin', component: AdminComponent},
  {path: '**', component: NotFoundComponent} //muss am schluss sein
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
