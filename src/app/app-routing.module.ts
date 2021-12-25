import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AddUserComponent} from "./add-user/add-user.component";
import {UserListComponent} from "./user-list/user-list.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "create",
    component: AddUserComponent
  },
  {
    path: "list",
    component: UserListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
