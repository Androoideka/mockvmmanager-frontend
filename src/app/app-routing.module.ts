import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AddUserComponent} from "./add-user/add-user.component";
import {UserListComponent} from "./user-list/user-list.component";
import {CreateGuard} from "./create.guard";
import {ReadGuard} from "./read.guard";
import {EditUserComponent} from "./edit-user/edit-user.component";
import {EditGuard} from "./edit.guard";
import {MainComponent} from "./main/main.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "create",
    component: AddUserComponent,
    canActivate: [CreateGuard]
  },
  {
    path: "list",
    component: UserListComponent,
    canActivate: [ReadGuard]
  },
  {
    path: 'edit',
    component: EditUserComponent,
    canActivate: [EditGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CreateGuard, ReadGuard, EditGuard]
})
export class AppRoutingModule { }
