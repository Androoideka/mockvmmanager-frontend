import { Component, OnInit } from '@angular/core';
import {User} from "../interfaces/user-model";
import {CrudService} from "../services/crud.service";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  page: number = 0;

  constructor(private authenticationService: AuthenticationService,
              private crudService: CrudService) {
    this.nextPage();
  }

  ngOnInit(): void {
  }

  get can_update(): boolean {
    return this.authenticationService.getPermissions.can_update_users;
  }

  get can_delete(): boolean {
    return this.authenticationService.getPermissions.can_delete_users;
  }

  deleteUser(user: User): void {
    this.crudService.deleteUser(user).subscribe(() => {
      const index: number = this.users.indexOf(user, 0);
      this.users.splice(index, 1);
    });
  }

  selectPage(page: number): void {
    this.crudService.listUsers(page).subscribe((response => {
      this.users = response.content;
      this.page = page + 1;
    }));
  }

  nextPage(): void {
    this.crudService.listUsers(this.page).subscribe((response => {
      this.users = response.content;
      this.page += 1;
    }));
  }

}
