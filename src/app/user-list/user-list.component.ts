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
  current_page: number = 0;
  total_pages: number = 0;
  page_numbers: number[] = [];

  constructor(private authenticationService: AuthenticationService,
              private crudService: CrudService) {
    this.selectPage(this.current_page);
  }

  ngOnInit(): void {
  }

  get can_update(): boolean {
    return this.authenticationService.can_update_users;
  }

  get can_delete(): boolean {
    return this.authenticationService.can_delete_users;
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
      this.total_pages = response.totalPages;
      this.page_numbers = [];
      for(let i = 0; i < this.total_pages; i++) {
        this.page_numbers.push(i);
      }
      this.current_page = page;
    }));
  }

  nextPage(): void {
    this.selectPage(this.current_page + 1);
  }

  prevPage(): void {
    this.selectPage(this.current_page - 1);
  }

}
