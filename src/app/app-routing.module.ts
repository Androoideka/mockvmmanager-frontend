import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {CreateUserComponent} from "./create-user/create-user.component";
import {UserListComponent} from "./user-list/user-list.component";
import {EditUserComponent} from "./edit-user/edit-user.component";
import {AuthGuard} from "./auth.guard";
import {PERMISSION_REPRESENTATIONS, PermissionList} from "./model/user-model";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "create",
    component: CreateUserComponent,
    canActivate: [AuthGuard],
    data: {
      requiredPermissions: PermissionList.fromRepresentations([PERMISSION_REPRESENTATIONS[0]])
    }
  },
  {
    path: "list",
    component: UserListComponent,
    canActivate: [AuthGuard],
    data: {
      requiredPermissions: PermissionList.fromRepresentations([PERMISSION_REPRESENTATIONS[1]])
    }
  },
  {
    path: 'edit',
    component: EditUserComponent,
    canActivate: [AuthGuard],
    data: {
      requiredPermissions: PermissionList.fromRepresentations([PERMISSION_REPRESENTATIONS[2]])
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
